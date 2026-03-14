import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import type { CustomerGateway } from '../../../domain/gateways/customer.gateway';
import type {
  Customer,
  CustomerTier,
} from '../../../domain/models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerService implements CustomerGateway {
  private readonly BASE_URL = environment.apiCustomers;

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.BASE_URL);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.BASE_URL}/${id}`);
  }

  updateCustomerTier(id: number, tier: CustomerTier): Observable<Customer> {
    return this.http.patch<Customer>(`${this.BASE_URL}/${id}/tier`, { tier });
  }

  searchCustomers(query: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.BASE_URL}/search?q=${query}`);
  }
}
