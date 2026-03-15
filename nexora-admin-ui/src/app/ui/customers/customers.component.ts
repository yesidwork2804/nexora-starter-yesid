import { Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  template: `
    <div class="customers-container">
      <h2>Clientes</h2>
      <div class="content-section">
        <p>Gestión de clientes del sistema</p>
      </div>
    </div>
  `,
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {
  constructor() {
    console.log('Customers component initialized');
  }
}
