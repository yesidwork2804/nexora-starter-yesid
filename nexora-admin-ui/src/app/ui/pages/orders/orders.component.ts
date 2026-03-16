import { Component, Inject, OnInit } from '@angular/core';
import { ObtenerProductosUseCase } from '../../../core/domain/usecases/products/obtener-productos.usecase';

@Component({
  selector: 'app-orders',
  template: `
    <div class="orders-container">
      <h2>📋 Órdenes</h2>
      <div class="content-section">
        <p>Gestión de órdenes del sistema Nexora</p>
      </div>
    </div>
  `,
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(
    @Inject(ObtenerProductosUseCase)
    private readonly obtenerProductosUseCase: ObtenerProductosUseCase,
  ) {
    console.log('Orders component initialized');
  }

  ngOnInit(): void {
    this.obtenerProductosUseCase.ejecutar().subscribe((products) => {
      console.log('Products loaded for orders:', products);
    });
  }
}
