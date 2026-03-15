'use strict';

const { getFunction } = require('@google-cloud/functions-framework/testing');

require('../src/syncInventory');

describe('syncInventory (CloudEvents)', () => {
  let onInventorySync;

  beforeEach(() => {
    onInventorySync = getFunction('onInventorySync');
  });

  describe('validación de payload', () => {
    it('debe lanzar error si data es null', () => {
      const cloudEvent = { data: null };
      expect(() => onInventorySync(cloudEvent)).toThrow('Payload inválido: data es requerido (objeto)');
    });

    it('debe lanzar error si productId falta', () => {
      const cloudEvent = { data: { newStock: 5 } };
      expect(() => onInventorySync(cloudEvent)).toThrow('Payload inválido: productId es requerido (texto)');
    });

    it('debe lanzar error si productId es string vacío', () => {
      const cloudEvent = { data: { productId: '   ', newStock: 5 } };
      expect(() => onInventorySync(cloudEvent)).toThrow('Payload inválido: productId es requerido (texto)');
    });

    it('debe lanzar error si productId no es string', () => {
      const cloudEvent = { data: { productId: 123, newStock: 5 } };
      expect(() => onInventorySync(cloudEvent)).toThrow('Payload inválido: productId es requerido (texto)');
    });

    it('debe lanzar error si newStock falta', () => {
      const cloudEvent = { data: { productId: 'NXR-001' } };
      expect(() => onInventorySync(cloudEvent)).toThrow('Payload inválido: newStock es requerido (número)');
    });

    it('debe lanzar error si newStock no es número', () => {
      const cloudEvent = { data: { productId: 'NXR-001', newStock: '10' } };
      expect(() => onInventorySync(cloudEvent)).toThrow('Payload inválido: newStock es requerido (número)');
    });

    it('debe lanzar error si newStock es NaN', () => {
      const cloudEvent = { data: { productId: 'NXR-001', newStock: NaN } };
      expect(() => onInventorySync(cloudEvent)).toThrow('Payload inválido: newStock es requerido (número)');
    });

    it('debe lanzar error si oldStock viene y no es número', () => {
      const cloudEvent = { data: { productId: 'NXR-001', newStock: 5, oldStock: '10' } };
      expect(() => onInventorySync(cloudEvent)).toThrow('Payload inválido: oldStock debe ser un número');
    });

    it('debe lanzar error si sku viene y no es string', () => {
      const cloudEvent = { data: { productId: 'NXR-001', newStock: 5, sku: 123 } };
      expect(() => onInventorySync(cloudEvent)).toThrow('Payload inválido: sku debe ser texto');
    });

    it('debe lanzar error si warehouseId viene y no es string', () => {
      const cloudEvent = { data: { productId: 'NXR-001', newStock: 5, warehouseId: 123 } };
      expect(() => onInventorySync(cloudEvent)).toThrow('Payload inválido: warehouseId debe ser texto');
    });

    it('debe lanzar error con múltiples campos inválidos', () => {
      const cloudEvent = { data: { productId: 123, newStock: 'abc', oldStock: 'xyz' } };
      expect(() => onInventorySync(cloudEvent)).toThrow('Payload inválido: productId es requerido (texto), newStock es requerido (número), oldStock debe ser un número');
    });
  });

  it('debe retornar payload exitoso para evento válido', () => {
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
