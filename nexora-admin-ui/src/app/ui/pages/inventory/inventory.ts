import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  template: `<p>Esta es la pagina de inventario</p>`,
  styleUrls: ['./inventory.css'],
})
export class Inventory {
  constructor() {
    console.log('Inventory component initialized');
  }
}
