import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import type { ProductGateway } from '../../../domain/gateways/product.gateway';
import type { Product } from '../../../domain/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService implements ProductGateway {
  private readonly BASE_URL = environment.apiProducts;
  private readonly INVENTORY_URL = environment.apiInventory;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.BASE_URL);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_URL}/${id}`);
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.BASE_URL, product);
  }

  updateProduct(id: number, data: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.BASE_URL}/${id}`, data);
  }

  updateStock(productId: number, quantity: number): Observable<void> {
    return this.http.post<void>(`${this.INVENTORY_URL}/stock-update`, {
      productId,
      quantity,
    });
  }

  deactivateProduct(id: number): Observable<Product> {
    return this.http.patch<Product>(`${this.BASE_URL}/${id}/status`, {
      status: 'INACTIVE',
    });
  }
}
