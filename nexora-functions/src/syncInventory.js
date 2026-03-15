'use strict';

const functions = require('@google-cloud/functions-framework');
const { validateInventorySyncPayload } = require('./validators/inventorySyncValidator');

const ERP_API_KEY        = process.env.ERP_API_KEY;
const ERP_URL            = process.env.ERP_URL;
const NOTIFICATION_URL   = process.env.NOTIFICATION_SERVICE_URL;
const LOW_STOCK_THRESHOLD = 10;

functions.cloudEvent('onInventorySync', (cloudEvent) => {

  const { productId, sku, oldStock, newStock, warehouseId } =
    validateInventorySyncPayload(cloudEvent.data);

  const stockDiff = newStock - (oldStock || 0);
  const timestamp = new Date().toISOString();

  // Logica de negocio mezclada con manejo HTTP
  if (newStock <= LOW_STOCK_THRESHOLD) {
    // Simula llamada a servicio de notificacion (credencial hardcodeada)
    console.log(JSON.stringify({
      timestamp,
      level: 'WARN',
      event: 'inventory_low_stock_alert',
      productId,
      sku,
      newStock,
    }));
    console.log(JSON.stringify({
      timestamp,
      level: 'INFO',
      event: 'notification_dispatch_attempt',
      notificationUrl: NOTIFICATION_URL,
      erpApiKeyPrefix: ERP_API_KEY ? ERP_API_KEY.substring(0, 8) : undefined,
    }));
  }

  // Sin structured logging: mezcla de mensajes sin formato consistente
  console.log(JSON.stringify({
    timestamp,
    level: 'INFO',
    event: 'inventory_sync_completed',
    productId,
    sku,
    stockDiff,
    warehouseId,
  }));

  return {
    status: 'success',
    message: 'Inventory synchronized',
    productId,
    sku,
    stockDiff,
    timestamp
  };
});
