import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import type { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'

import type { OrderGateway } from '../../domain/gateways/order.gateway'
import type { Order, OrderStatus } from '../../domain/models/order.model'

@Injectable({ providedIn: 'root' })
export class OrderHttpGateway implements OrderGateway {
  private readonly baseUrl = environment.apiOrders
  private readonly customerUrl = environment.apiCustomers

  constructor(private readonly http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl)
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`)
  }

  createOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order)
  }

  updateOrderStatus(id: number, status: OrderStatus): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/${id}/status`, { status })
  }

  getOrdersByCustomer(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.customerUrl}/${customerId}/orders`)
  }

  cancelOrder(id: number, reason: string): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/${id}/cancel`, { reason })
  }
}
