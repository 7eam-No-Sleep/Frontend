import { Component } from '@angular/core';
import { ApLeftcolumnComponent } from './ap-leftcolumn/ap-leftcolumn.component';
import { ApRightcolumnComponent } from './ap-rightcolumn/ap-rightcolumn.component';
import { Inventory } from '../view-inventory/inventory.model';
import { InventoryService } from '../shared/inventory.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ApLeftcolumnComponent, ApRightcolumnComponent, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  inventory: Inventory ={
    ProductID: 0,
    ProductName: '',
    Category: '',
    Description: '',
    CostPrice: 0,
    SellingPrice: 0,
    QuantityInStock: 0,
    Color: '',
    Size: '',
    Material: ''
  }

  constructor(private inventoryService: InventoryService){}

  updateFormData(data: Partial<Inventory>){
    this.inventory = {...this.inventory,...data}
  }

  submitForm(){
    this.inventoryService.addInventory(this.inventory)
    .subscribe({
      next: ()=>{
        location.reload();
      },
      error: (error)=>{
        console.error('Error adding Product: ', error);
      }
    });
  }

}
