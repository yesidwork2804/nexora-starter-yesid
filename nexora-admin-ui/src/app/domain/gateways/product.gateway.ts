import type { Observable } from 'rxjs'

import type { Product } from '../models/product.model'

export interface ProductGateway {
  getProducts(): Observable<Product[]>
  getProductById(id: number): Observable<Product>
  createProduct(product: Partial<Product>): Observable<Product>
  updateProduct(id: number, data: Partial<Product>): Observable<Product>
  updateStock(productId: number, quantity: number): Observable<void>
  deactivateProduct(id: number): Observable<Product>
}
