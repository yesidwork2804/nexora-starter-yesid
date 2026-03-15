import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from '../../../ui/products/products.component';
import { ProductsService } from '../../infrastructure/services/products/products.service';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
  ],
  providers: [
    // Services
    ProductsService,
  ],
})
export class ProductsModule {}
