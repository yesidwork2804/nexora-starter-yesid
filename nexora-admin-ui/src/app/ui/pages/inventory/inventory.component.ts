import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  template: `
    <div class="inventory-container">
      <h2>📊 Inventario</h2>
      <div class="content-section">
        <p>Gestión de inventario del sistema Nexora</p>
      </div>
    </div>
  `,
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent {
  constructor() {
    console.log('Inventory component initialized');
  }
}
