import { Component } from '@angular/core';
import { AcLeftcolumnComponent } from './ac-leftcolumn/ac-leftcolumn.component'; 
import { AcRightcolumnComponent } from './ac-rightcolumn/ac-rightcolumn.component';
import { Customer } from '../view-customers/customer.model';
import { CustomerService } from '../shared/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [AcLeftcolumnComponent, AcRightcolumnComponent, CommonModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {
  customer: Customer = {
    CustomerID: 0,
    FirstName: '',
    LastName: '',
    ContactNumber: '',
    Email: '',
    Street1: '',
    AptNo: '',
    City: '',
    State: '',
    ZipCode: '',
    Birthdate: ''
  };

  successMessage: string = '';

  constructor(private customerService: CustomerService) {}

  updateFormData(data: Partial<Customer>) {
    this.customer = { ...this.customer, ...data };
  }

  submitForm() {
   this.customerService.addCustomer(this.customer)
      .subscribe({
        next: () => {
          location.reload();   
        },
        error: (error) => {
          console.error('Error adding customer:', error);
        }
      });
  }
}