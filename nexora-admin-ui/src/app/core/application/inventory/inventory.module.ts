import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { INVENTORY_GATEWAY } from '../../domain/gateways/inventory.gateway';
import { InventoryHttpService } from '../../infrastructure/service/inventory-http.service';
import { InventoryComponent } from '../../../ui/pages/inventory/inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';

@NgModule({
  // Declaraciones
  declarations: [InventoryComponent],

  // Importaciones
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InventoryRoutingModule,
  ],

  // Proveedores
  providers: [
    // Services
    InventoryHttpService,

    // Gateway
    { provide: INVENTORY_GATEWAY, useClass: InventoryHttpService },
  ],
})
export class InventoryModule {}
