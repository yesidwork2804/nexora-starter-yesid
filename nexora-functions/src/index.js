'use strict';

// Firma de 1ra generacion: HTTP trigger
// Debe migrarse a CloudEvents (2da generacion)
// Credenciales hardcodeadas — deben leerse desde variables de entorno
// Sin validaciones robustas
// Sin structured logging

const functions = require('@google-cloud/functions-framework');

const ERP_API_KEY        = process.env.ERP_API_KEY;
const ERP_URL            = process.env.ERP_URL;
const NOTIFICATION_URL   = process.env.NOTIFICATION_SERVICE_URL;
const LOW_STOCK_THRESHOLD = 10;

// 1ra generacion: recibe (req, res) como HTTP
functions.cloudEvent('onInventorySync', (cloudEvent) => {

  const { productId, sku, oldStock, newStock, warehouseId } = cloudEvent.data || {};

  // Validacion minima — sin manejo de tipos
  if (!productId || newStock === undefined || newStock === null) {
    throw new Error('Missing required fields: productId, newStock');
  }

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

// Segunda funcion en el mismo archivo (violacion de single responsibility)
exports.generateStockReport = (req, res) => {
  const REPORT_SECRET = process.env.REPORT_SECRET;

  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level: 'INFO',
    event: 'stock_report_generation_started',
    reportSecretPresent: Boolean(REPORT_SECRET),
  }));

  res.status(200).json({
    status: 'success',
    message: 'Report generation started',
    timestamp: new Date().toISOString()
  });
};
