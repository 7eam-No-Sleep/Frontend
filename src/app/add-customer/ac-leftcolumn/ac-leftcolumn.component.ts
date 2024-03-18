import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { Customer } from '../../view-customers/customer.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-ac-leftcolumn',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ac-leftcolumn.component.html',
  styleUrl: './ac-leftcolumn.component.css'
})
export class AcLeftcolumnComponent {
  @Output() formDataChanged = new EventEmitter<Partial<Customer>>();

  FirstName: string='';
  LastName: string='';
  ContactNumber: string='';
  Email: string='';
  Street1: string='';

  constructor(){}

  emitFormData(){
    const formData: Partial<Customer>={
      FirstName: this.FirstName,
      LastName: this.LastName,
      ContactNumber: this.ContactNumber,
      Email: this.Email,
      Street1: this.Street1
    }
    this.formDataChanged.emit(formData);
  }

}

