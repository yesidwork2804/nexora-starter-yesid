import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  template: `
    <div class="orders-container">
      <h2>Órdenes</h2>
      <div class="content-section">
        <p>Gestión de órdenes del sistema</p>
      </div>
    </div>
  `,
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  constructor() {
    console.log('Orders component initialized');
  }
}
