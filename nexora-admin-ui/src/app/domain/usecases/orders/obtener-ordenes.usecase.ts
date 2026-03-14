import { Inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'

import { ORDER_GATEWAY, type OrderGateway } from '../../gateways/order.gateway'
import type { Order } from '../../models/order.model'

@Injectable({ providedIn: 'root' })
export class ObtenerOrdenesUseCase {
  constructor(@Inject(ORDER_GATEWAY) private readonly gateway: OrderGateway) {}

  ejecutar(): Observable<Order[]> {
    return this.gateway.getOrders()
  }
}
