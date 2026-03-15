import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  template: `
    <div class="products-container">
      <h2>Productos</h2>
      <div class="content-section">
        <p>Gestión de productos del sistema</p>
      </div>
    </div>
  `,
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  constructor() {
    console.log('Products component initialized');
  }
}
