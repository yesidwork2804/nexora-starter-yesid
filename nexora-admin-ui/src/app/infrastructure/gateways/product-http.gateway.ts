import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import type { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'

import type { ProductGateway } from '../../domain/gateways/product.gateway'
import type { Product } from '../../domain/models/product.model'

@Injectable({ providedIn: 'root' })
export class ProductHttpGateway implements ProductGateway {
  private readonly baseUrl = environment.apiProducts
  private readonly inventoryUrl = environment.apiInventory

  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product)
  }

  updateProduct(id: number, data: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, data)
  }

  updateStock(productId: number, quantity: number): Observable<void> {
    return this.http.post<void>(`${this.inventoryUrl}/stock-update`, {
      productId,
      quantity,
    })
  }

  deactivateProduct(id: number): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${id}/status`, {
      status: 'INACTIVE',
    })
  }
}
