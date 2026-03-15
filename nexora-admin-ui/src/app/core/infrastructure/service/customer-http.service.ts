import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import type { CustomerGateway } from '../../domain/gateways/customer.gateway';
import type {
  Customer,
  CustomerTier,
} from '../../domain/models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerHttpService implements CustomerGateway {
  private readonly baseUrl = environment.apiCustomers;

  constructor(private readonly http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  updateCustomerTier(id: number, tier: CustomerTier): Observable<Customer> {
    return this.http.patch<Customer>(`${this.baseUrl}/${id}/tier`, { tier });
  }

  searchCustomers(query: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/search?q=${query}`);
  }
}
