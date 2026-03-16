import { Component, Inject, OnInit } from '@angular/core';
import { ObtenerProductosUseCase } from '../../../core/domain/usecases/products/obtener-productos.usecase';

@Component({
  selector: 'app-products',
  template: `
    <div class="products-container">
      <h2>📦 Productos</h2>
      <div class="content-section">
        <p>Gestión de productos del sistema Nexora</p>
      </div>
    </div>
  `,
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    @Inject(ObtenerProductosUseCase)
    private readonly obtenerProductosUseCase: ObtenerProductosUseCase,
  ) {}

  ngOnInit(): void {
    this.obtenerProductosUseCase.ejecutar().subscribe((products) => {
      console.log('Products loaded:', products);
    });
  }
}
