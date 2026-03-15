import { Inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'

import { PRODUCT_GATEWAY, type ProductGateway } from '../../gateways/product.gateway'
import type { Product } from '../../models/product.model'

@Injectable({ providedIn: 'root' })
export class DesactivarProductoUseCase {
  constructor(@Inject(PRODUCT_GATEWAY) private readonly gateway: ProductGateway) {}

  ejecutar(id: number): Observable<Product> {
    return this.gateway.deactivateProduct(id)
  }
}
