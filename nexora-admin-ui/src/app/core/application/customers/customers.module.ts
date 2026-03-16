import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOMER_GATEWAY } from '../../domain/gateways/customer.gateway';
import { CustomerHttpService } from '../../infrastructure/service/customer-http.service';
import { CustomersComponent } from '../../../ui/pages/customers/customers.component';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
  ],
  providers: [
    // Services
    CustomerHttpService,

    // Gateway
    { provide: CUSTOMER_GATEWAY, useClass: CustomerHttpService },
  ],
})
export class CustomersModule {}
