import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction} from './transaction.model';
import { TransactionService } from '../shared/transaction.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent {
  
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  searchQuery: string='';
  
  constructor(private TransactionService: TransactionService){}

  ngOnInit(): void{
    this.TransactionService.getTransactions().subscribe({
      next: (data)=>{
        this.transactions = data;
        this.filteredTransactions = [...this.transactions];
      },
      error: (error)=>{
        console.error('Error Fetching Inventory: ', error);
      }
    })
  }
  searchTransactions(){
    if(!this.searchQuery || this.searchQuery==''){
      this.filteredTransactions = [...this.transactions];
    } else{
      const query = parseInt(this.searchQuery);
      this.filteredTransactions = this.transactions.filter((transaction)=>
      transaction.TransactionID == query ||
      transaction.SalesID == query ||
      transaction.CustomerID == query)
    }
  }
}
