import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryComponent } from '../../../ui/inventory/inventory.component';
import { InventoryService } from '../../infrastructure/services/inventory/inventory.service';
import { InventoryRoutingModule } from './inventory-routing.module';

@NgModule({
  declarations: [InventoryComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InventoryRoutingModule,
  ],
  providers: [
    // Services
    InventoryService,
  ],
})
export class InventoryModule {}
