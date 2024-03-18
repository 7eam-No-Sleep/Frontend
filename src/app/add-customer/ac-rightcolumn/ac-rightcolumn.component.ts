import { Component, EventEmitter, Output, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../view-customers/customer.model';

@Component({
  selector: 'app-ac-rightcolumn',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ac-rightcolumn.component.html',
  styleUrl: '/src/app/add-customer/ac-leftcolumn/ac-leftcolumn.component.css'
})
export class AcRightcolumnComponent {
  @Output() formDataChanged = new EventEmitter<Partial<Customer>>();

  AptNo: string='';
  City: string='';
  State: string='';
  ZipCode: string='';
  Birthdate: string='';

  constructor(){}

  emitFormData(){
    const formData: Partial<Customer>={
      AptNo: this.AptNo,
      City: this.City,
      State: this.State,
      ZipCode: this.ZipCode,
      Birthdate: this.Birthdate
    }
    this.formDataChanged.emit(formData)
  }

}
