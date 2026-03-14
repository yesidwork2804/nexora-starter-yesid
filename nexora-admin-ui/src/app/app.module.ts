import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CUSTOMER_GATEWAY } from './domain/gateways/customer.gateway';
import { INVENTORY_GATEWAY } from './domain/gateways/inventory.gateway';
import { ORDER_GATEWAY } from './domain/gateways/order.gateway';
import { PRODUCT_GATEWAY } from './domain/gateways/product.gateway';
import { CustomerHttpGateway } from './infrastructure/gateways/customer-http.gateway';
import { InventoryHttpGateway } from './infrastructure/gateways/inventory-http.gateway';
import { OrderHttpGateway } from './infrastructure/gateways/order-http.gateway';
import { ProductHttpGateway } from './infrastructure/gateways/product-http.gateway';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: PRODUCT_GATEWAY, useClass: ProductHttpGateway },
    { provide: ORDER_GATEWAY, useClass: OrderHttpGateway },
    { provide: CUSTOMER_GATEWAY, useClass: CustomerHttpGateway },
    { provide: INVENTORY_GATEWAY, useClass: InventoryHttpGateway },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
