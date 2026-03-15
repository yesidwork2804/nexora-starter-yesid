import { InjectionToken } from '@angular/core';
import type { Observable } from 'rxjs';

import type { Product } from '../models/product.model';

export const PRODUCT_GATEWAY = new InjectionToken<ProductGateway>(
  'PRODUCT_GATEWAY',
);

export interface ProductGateway {
  getProducts(): Observable<Product[]>;
  getProductById(id: number): Observable<Product>;
  createProduct(product: Partial<Product>): Observable<Product>;
  updateProduct(id: number, data: Partial<Product>): Observable<Product>;
  updateStock(productId: number, quantity: number): Observable<void>;
  deactivateProduct(id: number): Observable<Product>;
}
