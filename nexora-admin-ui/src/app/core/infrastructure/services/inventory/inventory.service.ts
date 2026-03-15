import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InventoryItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  location: string;
  lastUpdated: Date;
}

export interface StockMovement {
  id: number;
  inventoryItemId: number;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  createdAt: Date;
  createdBy: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private readonly apiUrl = 'api/inventory';

  constructor(private http: HttpClient) {}

  getInventory(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.apiUrl);
  }

  getInventoryItem(id: number): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.apiUrl}/${id}`);
  }

  updateStock(id: number, quantity: number): Observable<InventoryItem> {
    return this.http.patch<InventoryItem>(`${this.apiUrl}/${id}/stock`, { quantity });
  }

  getStockMovements(itemId?: number): Observable<StockMovement[]> {
    const url = itemId ? `${this.apiUrl}/movements?itemId=${itemId}` : `${this.apiUrl}/movements`;
    return this.http.get<StockMovement[]>(url);
  }

  addStockMovement(movement: Omit<StockMovement, 'id' | 'createdAt'>): Observable<StockMovement> {
    return this.http.post<StockMovement>(`${this.apiUrl}/movements`, movement);
  }

  getLowStockItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.apiUrl}/low-stock`);
  }
}
