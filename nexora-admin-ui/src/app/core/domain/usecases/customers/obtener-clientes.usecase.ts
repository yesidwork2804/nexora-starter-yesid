import { Inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'

import { CUSTOMER_GATEWAY, type CustomerGateway } from '../../gateways/customer.gateway'
import type { Customer } from '../../models/customer.model'

@Injectable({ providedIn: 'root' })
export class ObtenerClientesUseCase {
  constructor(@Inject(CUSTOMER_GATEWAY) private readonly gateway: CustomerGateway) {}

  ejecutar(): Observable<Customer[]> {
    return this.gateway.getCustomers()
  }
}
