'use strict';

const { getFunction } = require('@google-cloud/functions-framework/testing');

require('../src/syncInventory');

describe('syncInventory (CloudEvents)', () => {
  let onInventorySync;

  beforeEach(() => {
    onInventorySync = getFunction('onInventorySync');
  });

  it('should throw when productId is missing', () => {
    const cloudEvent = { data: { newStock: 5 } };
    expect(() => onInventorySync(cloudEvent)).toThrow('Missing required fields: productId, newStock');
  });

  it('should throw when newStock is missing', () => {
    const cloudEvent = { data: { productId: 'NXR-001' } };
    expect(() => onInventorySync(cloudEvent)).toThrow('Missing required fields: productId, newStock');
  });

  it('should return success payload for valid sync event', () => {
    const cloudEvent = {
      data: {
        productId: 'NXR-001',
        sku: 'NXR-001',
        oldStock: 50,
        newStock: 45,
        warehouseId: 'WH-01'
      }
    };

    const result = onInventorySync(cloudEvent);

    expect(result).toEqual(expect.objectContaining({
      status: 'success',
      message: 'Inventory synchronized',
      productId: 'NXR-001',
      sku: 'NXR-001',
      stockDiff: -5,
    }));
    expect(result.timestamp).toEqual(expect.any(String));
  });
});
