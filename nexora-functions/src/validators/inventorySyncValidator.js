'use strict';

function validateInventorySyncPayload(data) {
  const errors = [];

  if (!data || typeof data !== 'object') {
    errors.push('data es requerido (objeto)');
  }

  const productId = data && data.productId;
  const sku = data && data.sku;
  const oldStock = data && data.oldStock;
  const newStock = data && data.newStock;
  const warehouseId = data && data.warehouseId;

  if (typeof productId !== 'string' || productId.trim().length === 0) {
    errors.push('productId es requerido (texto)');
  }

  if (typeof newStock !== 'number' || !Number.isFinite(newStock)) {
    errors.push('newStock es requerido (número)');
  }

  if (oldStock !== undefined && oldStock !== null) {
    if (typeof oldStock !== 'number' || !Number.isFinite(oldStock)) {
      errors.push('oldStock debe ser un número');
    }
  }

  if (sku !== undefined && sku !== null) {
    if (typeof sku !== 'string') {
      errors.push('sku debe ser texto');
    }
  }

  if (warehouseId !== undefined && warehouseId !== null) {
    if (typeof warehouseId !== 'string') {
      errors.push('warehouseId debe ser texto');
    }
  }

  if (errors.length > 0) {
    throw new Error(`Payload inválido: ${errors.join(', ')}`);
  }

  return { productId, sku, oldStock, newStock, warehouseId };
}

module.exports = { validateInventorySyncPayload };
