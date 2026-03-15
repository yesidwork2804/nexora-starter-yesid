import { Inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'

import { PRODUCT_GATEWAY, type ProductGateway } from '../../gateways/product.gateway'

@Injectable({ providedIn: 'root' })
export class ActualizarStockUseCase {
  constructor(@Inject(PRODUCT_GATEWAY) private readonly gateway: ProductGateway) {}

  ejecutar(productId: number, quantity: number): Observable<void> {
    return this.gateway.updateStock(productId, quantity)
  }
}
