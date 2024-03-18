import { Component, EventEmitter, Output, NgModule } from '@angular/core';
import { Inventory } from '../../view-inventory/inventory.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ap-leftcolumn',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ap-leftcolumn.component.html',
  styleUrl: './ap-leftcolumn.component.css'
})

export class ApLeftcolumnComponent {
  @Output() formDataChanged = new EventEmitter<Partial<Inventory>>();

  ProductName: string='';
  Category: string='';
  Description: string='';
  Material: string='';
  Size: string='';

  constructor(){}

  emitFormData(){
    const formData: Partial<Inventory>={
      ProductName: this.ProductName,
      Category: this.Category,
      Description: this.Description,
      Material: this.Material,
      Size: this.Size
    }
    this.formDataChanged.emit(formData);
  }

}
