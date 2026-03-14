import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import type { InventoryGateway } from '../../../domain/gateways/inventory.gateway';
import type {
  InventoryMovement,
  StockLevel,
} from '../../../domain/models/inventory.model';

@Injectable({ providedIn: 'root' })
export class InventoryService implements InventoryGateway {
  private readonly BASE_URL = environment.apiInventory;
  private readonly REPORTS_URL = environment.apiReports;

  constructor(private http: HttpClient) {}

  getStockLevels(): Observable<StockLevel[]> {
    return this.http.get<StockLevel[]>(`${this.BASE_URL}/stock-levels`);
  }

  getMovements(productId: number): Observable<InventoryMovement[]> {
    return this.http.get<InventoryMovement[]>(
      `${this.BASE_URL}/movements?productId=${productId}`,
    );
  }

  getLowStockReport(): Observable<StockLevel[]> {
    return this.http.get<StockLevel[]>(`${this.REPORTS_URL}/low-stock`);
  }
}
