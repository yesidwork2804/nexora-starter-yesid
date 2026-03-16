import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PRODUCT_GATEWAY } from '../../domain/gateways/product.gateway';
import { ProductHttpService } from '../../infrastructure/service/product-http.service';
import { ObtenerProductosUseCase } from '../../domain/usecases/products/obtener-productos.usecase';
import { ProductsComponent } from '../../../ui/pages/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, HttpClientModule, ProductsRoutingModule],
  providers: [
    // Usecases
    ObtenerProductosUseCase,

    // Services
    ProductHttpService,

    // Gateway
    { provide: PRODUCT_GATEWAY, useClass: ProductHttpService },
  ],
})
export class ProductsModule {}
