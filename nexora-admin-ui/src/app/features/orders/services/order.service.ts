import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import type { OrderGateway } from '../../../domain/gateways/order.gateway';
import type { Order, OrderStatus } from '../../../domain/models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService implements OrderGateway {
  private readonly BASE_URL = environment.apiOrders;
  private readonly CUSTOMER_URL = environment.apiCustomers;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.BASE_URL);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.BASE_URL}/${id}`);
  }

  createOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.BASE_URL, order);
  }

  updateOrderStatus(id: number, status: OrderStatus): Observable<Order> {
    return this.http.patch<Order>(`${this.BASE_URL}/${id}/status`, { status });
  }

  getOrdersByCustomer(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.CUSTOMER_URL}/${customerId}/orders`);
  }

  cancelOrder(id: number, reason: string): Observable<Order> {
    return this.http.post<Order>(`${this.BASE_URL}/${id}/cancel`, { reason });
  }
}
