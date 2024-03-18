import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Inventory } from '../../view-inventory/inventory.model';


@Component({
  selector: 'app-ap-rightcolumn',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ap-rightcolumn.component.html',
  styleUrl: '/src/app/add-product/ap-leftcolumn/ap-leftcolumn.component.css'
})
export class ApRightcolumnComponent {
  @Output() formDataChanged = new EventEmitter<Partial<Inventory>>();

  Color: string='';
  CostPrice: number=0;
  SellingPrice: number=0;
  QuantityInStock: number=0;

  constructor(){}

  emitFormData(){
    const formData: Partial<Inventory>={
      Color: this.Color,
      CostPrice: this.CostPrice,
      SellingPrice: this.SellingPrice,
      QuantityInStock: this.QuantityInStock
    }
    this.formDataChanged.emit(formData)
  }

}
