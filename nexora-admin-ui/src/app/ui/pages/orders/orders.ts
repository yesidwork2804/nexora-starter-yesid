import { Component, Inject, OnInit } from '@angular/core';
import { ObtenerProductosUseCase } from '../../../core/domain/usecases/products/obtener-productos.usecase';

@Component({
  selector: 'app-orders',
  template: `<p>Esta es la pagina de ordenes</p>`,
  styleUrls: ['./orders.css'],
})
export class Orders implements OnInit {
  constructor(
    @Inject(ObtenerProductosUseCase)
    private readonly obtenerProductosUseCase: ObtenerProductosUseCase,
  ) {
    console.log('Orders component initialized');
  }

  ngOnInit(): void {
    this.obtenerProductosUseCase.ejecutar().subscribe((products) => {
      console.log(products);
    });
  }
}
