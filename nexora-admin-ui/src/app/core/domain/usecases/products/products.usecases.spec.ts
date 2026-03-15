import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import {
  PRODUCT_GATEWAY,
  type ProductGateway,
} from '../../gateways/product.gateway';
import type { Product } from '../../models/product.model';
import { ActualizarStockUseCase } from './actualizar-stock.usecase';
import { DesactivarProductoUseCase } from './desactivar-producto.usecase';
import { ObtenerProductosUseCase } from './obtener-productos.usecase';

describe('UseCases de Products', () => {
  let gateway: jasmine.SpyObj<ProductGateway>;

  beforeEach(() => {
    gateway = jasmine.createSpyObj<ProductGateway>('ProductGateway', [
      'getProducts',
      'updateStock',
      'deactivateProduct',
      'getProductById',
      'createProduct',
      'updateProduct',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: PRODUCT_GATEWAY, useValue: gateway },
        ObtenerProductosUseCase,
        ActualizarStockUseCase,
        DesactivarProductoUseCase,
      ],
    });
  });

  it('ObtenerProductosUseCase debe delegar en el gateway', () => {
    const usecase = TestBed.inject(ObtenerProductosUseCase);

    const expected: Product[] = [
      {
        id: 1,
        sku: 'NXR-001',
        name: 'Widget Pro',
        description: 'Pro widget',
        price: 99.99,
        stock: 50,
        category: 'widgets',
        status: 'ACTIVE',
      },
    ];

    gateway.getProducts.and.returnValue(of(expected));

    usecase.ejecutar().subscribe((products) => {
      expect(products).toEqual(expected);
    });

    expect(gateway.getProducts).toHaveBeenCalledTimes(1);
  });

  it('ActualizarStockUseCase debe delegar en el gateway', () => {
    const usecase = TestBed.inject(ActualizarStockUseCase);

    gateway.updateStock.and.returnValue(of(void 0));

    usecase.ejecutar(10, 3).subscribe(() => {
      expect(true).toBeTrue();
    });

    expect(gateway.updateStock).toHaveBeenCalledWith(10, 3);
  });

  it('DesactivarProductoUseCase debe delegar en el gateway', () => {
    const usecase = TestBed.inject(DesactivarProductoUseCase);

    const expected: Product = {
      id: 7,
      sku: 'NXR-007',
      name: 'Widget Basic',
      description: 'Basic widget',
      price: 19.99,
      stock: 0,
      category: 'widgets',
      status: 'INACTIVE',
    };

    gateway.deactivateProduct.and.returnValue(of(expected));

    usecase.ejecutar(7).subscribe((product) => {
      expect(product).toEqual(expected);
    });

    expect(gateway.deactivateProduct).toHaveBeenCalledWith(7);
  });
});
