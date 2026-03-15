import { Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  template: `<p>Esta es la pagina de clientes</p>`,
  styleUrls: ['./customers.css'],
})
export class Customers {
  constructor() {
    console.log('Customers component initialized');
  }
}
