import { Inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'

import { INVENTORY_GATEWAY, type InventoryGateway } from '../../gateways/inventory.gateway'
import type { StockLevel } from '../../models/inventory.model'

@Injectable({ providedIn: 'root' })
export class ObtenerNivelesStockUseCase {
  constructor(@Inject(INVENTORY_GATEWAY) private readonly gateway: InventoryGateway) {}

  ejecutar(): Observable<StockLevel[]> {
    return this.gateway.getStockLevels()
  }
}
