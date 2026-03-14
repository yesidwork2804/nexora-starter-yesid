import type { Observable } from 'rxjs'

import type { Order, OrderStatus } from '../models/order.model'

export interface OrderGateway {
  getOrders(): Observable<Order[]>
  getOrderById(id: number): Observable<Order>
  createOrder(order: Partial<Order>): Observable<Order>
  updateOrderStatus(id: number, status: OrderStatus): Observable<Order>
  getOrdersByCustomer(customerId: number): Observable<Order[]>
  cancelOrder(id: number, reason: string): Observable<Order>
}
