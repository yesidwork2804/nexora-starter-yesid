import { InjectionToken } from '@angular/core';
import type { Observable } from 'rxjs';

import type { InventoryMovement, StockLevel } from '../models/inventory.model';

export const INVENTORY_GATEWAY = new InjectionToken<InventoryGateway>(
  'INVENTORY_GATEWAY',
);

export interface InventoryGateway {
  getStockLevels(): Observable<StockLevel[]>;
  getMovements(productId: number): Observable<InventoryMovement[]>;
  getLowStockReport(): Observable<StockLevel[]>;
}
