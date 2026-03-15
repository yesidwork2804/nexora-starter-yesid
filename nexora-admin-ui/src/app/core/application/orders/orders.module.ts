import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from '../../../ui/orders/orders.component';
import { OrdersService } from '../../infrastructure/services/orders/orders.service';
import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
  declarations: [OrdersComponent],
  imports: [CommonModule, OrdersRoutingModule],
  providers: [
    // Services
    OrdersService,
  ],
})
export class OrdersModule {}
