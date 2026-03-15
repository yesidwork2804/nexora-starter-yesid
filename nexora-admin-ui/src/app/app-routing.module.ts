import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./core/application/products/products.module').then(
        (m) => m.ProductsModule,
      ),
    canActivate: [],
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./core/application/orders/orders.module').then(
        (m) => m.OrdersModule,
      ),
    canActivate: [],
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./core/application/customers/customers.module').then(
        (m) => m.CustomersModule,
      ),
    canActivate: [],
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./core/application/inventory/inventory.module').then(
        (m) => m.InventoryModule,
      ),
    canActivate: [],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./core/application/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
