import type { Observable } from 'rxjs'

import type { Customer, CustomerTier } from '../models/customer.model'

export interface CustomerGateway {
  getCustomers(): Observable<Customer[]>
  getCustomerById(id: number): Observable<Customer>
  updateCustomerTier(id: number, tier: CustomerTier): Observable<Customer>
  searchCustomers(query: string): Observable<Customer[]>
}
