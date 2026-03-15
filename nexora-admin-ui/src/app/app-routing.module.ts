import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./core/application/products/products.module').then(
        (m) => m.ProductsModule,
      ),
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./core/application/customers/customers.module').then(
        (m) => m.CustomersModule,
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./core/application/orders/orders.module').then(
        (m) => m.OrdersModule,
      ),
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./core/application/inventory/inventory.module').then(
        (m) => m.InventoryModule,
      ),
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
