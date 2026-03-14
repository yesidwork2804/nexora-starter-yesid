import type { Observable } from 'rxjs'

import type { InventoryMovement, StockLevel } from '../models/inventory.model'

export interface InventoryGateway {
  getStockLevels(): Observable<StockLevel[]>
  getMovements(productId: number): Observable<InventoryMovement[]>
  getLowStockReport(): Observable<StockLevel[]>
}
