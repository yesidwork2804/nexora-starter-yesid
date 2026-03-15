import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ORDER_GATEWAY } from '../../domain/gateways/order.gateway';
import { OrderHttpService } from '../../infrastructure/service/order-http.service';
import { Orders } from '../../../ui/pages/orders/orders';
import { OrdersRoutingModule } from './orders-routing.module';
import { CommonModule } from '@angular/common';
import { ProductsModule } from '../products/products.module';

@NgModule({
  declarations: [Orders],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
    ProductsModule,
  ],
  providers: [
    // Services
    OrderHttpService,

    // Gateway
    { provide: ORDER_GATEWAY, useClass: OrderHttpService },
  ],
})
export class OrdersModule {}
