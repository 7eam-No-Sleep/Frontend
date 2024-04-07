import { Component } from '@angular/core';
import { SaleService } from '../../shared/sale.service';
import { CustomerService } from '../../shared/customer.service';
import { TransactionService } from '../../shared/transaction.service';
import { Customer } from '../../view-customers/customer.model';
import { Transaction } from '../../transaction-history/transaction.model';
import { MidColumnComponent } from '../mid-column/mid-column.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-right-column',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './right-column.component.html',
  styleUrl: './right-column.component.css'
})
export class RightColumnComponent {
  saleID: number = 0;
  customerPhoneNumber: string = '';
  paymentMethod: string = '';
  customerID : number = 0;
  finalAmount: number = 0;

  constructor(private saleService: SaleService, private transactionService: TransactionService, private customerService: CustomerService, private datePipe: DatePipe){}

  finalizeSale(): void {

    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd') || ''; // Use fallback value ''


    const newTransaction: Transaction = {
      TransactionID: 0,
      SaleID: this.saleID,
      CustomerID: this.customerID,
      TransactionDate: formattedDate,
      PaymentMethod: this.paymentMethod,
      TotalAmount: this.saleService.salesTotal
    };
  
    this.transactionService.createTransaction(newTransaction).subscribe({
      next: () => {
        console.log('Transaction created successfully.');
        // Optionally, you can reset the form or perform other actions here
      },
      error: (error) => {
        console.error('Error creating transaction:', error);
        // Handle the error appropriately, such as displaying an error message to the user
      }
    });
  }

  fetchCustomerId(): void {
    if (!this.customerPhoneNumber) {
      console.log('Please enter a customer phone number');
      this.customerID = 0;
      return;
    }
  
    this.customerService.getCustomerByPhoneNumber(this.customerPhoneNumber).subscribe({
      next: (customer: Customer) => {
        if (customer) {
          this.customerID = customer.CustomerID;
          console.log('Customer found:', customer);
        } else {
          console.log('Customer not found');
          this.customerID = 0;
        }
      },
      error: (error) => {
        console.error('Error fetching customer:', error);
        this.customerID = 0;
      }
    });
  }

  clearForm():void{
    this.saleID=0;
    this.customerPhoneNumber = '';
    this.paymentMethod = '';
    this.customerID = 0;
    this.saleService.clearCart();

  }
}