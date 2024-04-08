import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
import { CommonModule } from '@angular/common';
import { Customer } from './customer.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-customers.component.html',
  styleUrl: '/src/app/view-inventory/view-inventory.component.css'
})
export class ViewCustomersComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[]=[];
  searchQuery: string='';

  constructor(private customerService: CustomerService, private router: Router){}
  
  ngOnInit(): void{
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.filteredCustomers=[...this.customers];
      },
      error: (error) => {
        console.error('Error fetching customers: ', error);
      }
    });
  }

  searchCustomers(){
    if(!this.searchQuery || this.searchQuery==''){
      this.filteredCustomers=[...this.customers];
    }else{
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredCustomers = this.customers.filter((customer)=>
      customer.CustomerID.toString().includes(query) ||
      customer.FirstName.toLowerCase().includes(query) ||
      customer.LastName.toLowerCase().includes(query) ||
      customer.ContactNumber.includes(query) 
      );
    }
  }
  onEdit(customerId: number){
    this.router.navigate(['/customer', customerId, 'edit'])
  }
}
