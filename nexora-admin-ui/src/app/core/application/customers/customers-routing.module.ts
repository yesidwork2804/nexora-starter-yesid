import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Customers } from '../../../ui/pages/customers/customers';

const routes: Routes = [
  {
    path: '',
    component: Customers
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
