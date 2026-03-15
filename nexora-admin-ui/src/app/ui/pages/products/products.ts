import { Component, Inject, OnInit } from '@angular/core';
import { ObtenerProductosUseCase } from '../../../core/domain/usecases/products/obtener-productos.usecase';

@Component({
  selector: 'app-products',
  template: `<p>Esta es la pagina de productos</p>`,
  styleUrls: ['./products.css'],
})
export class Products implements OnInit {
  constructor(
    @Inject(ObtenerProductosUseCase)
    private readonly obtenerProductosUseCase: ObtenerProductosUseCase,
  ) {}

  ngOnInit(): void {
    this.obtenerProductosUseCase.ejecutar().subscribe((products) => {
      console.log(products);
    });
  }
}
