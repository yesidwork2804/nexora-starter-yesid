import { TestBed } from '@angular/core/testing'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'

import { environment } from 'src/environments/environment'
import { ProductHttpGateway } from './product-http.gateway'

describe('ProductHttpGateway', () => {
  let gateway: ProductHttpGateway
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductHttpGateway],
    })

    gateway = TestBed.inject(ProductHttpGateway)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => httpMock.verify())

  it('debe consultar productos en el endpoint configurado', () => {
    gateway.getProducts().subscribe((response) => {
      expect(response.length).toBe(1)
    })

    const req = httpMock.expectOne(environment.apiProducts)
    expect(req.request.method).toBe('GET')
    req.flush([
      {
        id: 1,
        sku: 'NXR-001',
        name: 'Widget Pro',
        description: 'Pro widget',
        price: 99.99,
        stock: 50,
        category: 'widgets',
        status: 'ACTIVE',
      },
    ])
  })

  it('debe llamar endpoint de inventario para actualizar stock', () => {
    const productId = 10
    const quantity = 3

    gateway.updateStock(productId, quantity).subscribe(() => {
      expect(true).toBeTrue()
    })

    const req = httpMock.expectOne(`${environment.apiInventory}/stock-update`)
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual({ productId, quantity })
    req.flush(null)
  })

  it('debe llamar endpoint de productos para desactivar', () => {
    const id = 7

    gateway.deactivateProduct(id).subscribe((response) => {
      expect(response.status).toBe('INACTIVE')
    })

    const req = httpMock.expectOne(`${environment.apiProducts}/${id}/status`)
    expect(req.request.method).toBe('PATCH')
    expect(req.request.body).toEqual({ status: 'INACTIVE' })
    req.flush({
      id,
      sku: 'NXR-007',
      name: 'Widget Basic',
      description: 'Basic widget',
      price: 19.99,
      stock: 0,
      category: 'widgets',
      status: 'INACTIVE',
    })
  })
})
