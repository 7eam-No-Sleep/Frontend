import { Component } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
import { Customer } from '../view-customers/customer.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent {
  customerId: number = 0;
  customer: Customer ={
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
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: params => {
        this.customerId = params['id'];
        this.customerService.getCustomerById(this.customerId).subscribe({
          next: data => {
            this.customer = data;
          },
          error: error => {
            console.error('Error fetching customer details:', error);
          }
        });
      },
      error: error => {
        console.error('Error subscribing to route params:', error);
      }
    });
  }

saveCustomer(): void {
  this.customerService.updateCustomer(this.customer).subscribe({
    next: data => {
      console.log('Customer updated successfully:', data);
      this.router.navigate(['/viewcustomers']);
    },
    error: error => {
      console.error('Error updating customer:', error);
    }
  });
}

}
