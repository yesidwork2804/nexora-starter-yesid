import { Inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'

import { PRODUCT_GATEWAY, type ProductGateway } from '../../gateways/product.gateway'
import type { Product } from '../../models/product.model'

@Injectable({ providedIn: 'root' })
export class ObtenerProductosUseCase {
  constructor(@Inject(PRODUCT_GATEWAY) private readonly gateway: ProductGateway) {}

  ejecutar(): Observable<Product[]> {
    return this.gateway.getProducts()
  }
}
