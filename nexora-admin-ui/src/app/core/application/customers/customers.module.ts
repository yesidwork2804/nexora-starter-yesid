import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from '../../../ui/customers/customers.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersService } from '../../infrastructure/services/customers/customers.service';

@NgModule({
  declarations: [CustomersComponent],
  imports: [CommonModule, CustomersRoutingModule],
  providers: [
    // Services
    CustomersService,
  ],
})
export class CustomersModule {}
