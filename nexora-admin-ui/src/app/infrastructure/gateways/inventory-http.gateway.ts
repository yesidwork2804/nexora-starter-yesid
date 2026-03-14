import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import type { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'

import type { InventoryGateway } from '../../domain/gateways/inventory.gateway'
import type { InventoryMovement, StockLevel } from '../../domain/models/inventory.model'

@Injectable({ providedIn: 'root' })
export class InventoryHttpGateway implements InventoryGateway {
  private readonly baseUrl = environment.apiInventory
  private readonly reportsUrl = environment.apiReports

  constructor(private readonly http: HttpClient) {}

  getStockLevels(): Observable<StockLevel[]> {
    return this.http.get<StockLevel[]>(`${this.baseUrl}/stock-levels`)
  }

  getMovements(productId: number): Observable<InventoryMovement[]> {
    return this.http.get<InventoryMovement[]>(
      `${this.baseUrl}/movements?productId=${productId}`,
    )
  }

  getLowStockReport(): Observable<StockLevel[]> {
    return this.http.get<StockLevel[]>(`${this.reportsUrl}/low-stock`)
  }
}
