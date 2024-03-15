import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
import { CommonModule } from '@angular/common';
import { Customer } from './customer.model';

@Component({
  selector: 'app-view-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-customers.component.html',
  styleUrl: '/src/app/view-inventory/view-inventory.component.css'
})
export class ViewCustomersComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private customerService: CustomerService){}
  
  ngOnInit(): void{
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (error) => {
        console.error('Error fetching customers: ', error);
      }
    });
  }
}
