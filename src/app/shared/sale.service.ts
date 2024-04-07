import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inventory } from '../view-inventory/inventory.model';
import { TransactionService } from './transaction.service';
import { Transaction } from '../transaction-history/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  public cartItems: Inventory[] = [];
  public salesTotal: number = 0;
  public salesTax: number = this.salesTotal*.125
  public discountedTotal: number = 0;
  public paymentMethod: string = '';

  constructor(private transactioNService: TransactionService){}

  addToCard(item: Inventory): void{

    const sellingPrice = typeof item.SellingPrice === 'string' ? parseFloat(item.SellingPrice) : item.SellingPrice;
    this.cartItems.push(item);
    this.salesTotal += item.SellingPrice;
  }

  applyDiscount(discountAmount: number): void{
    this.discountedTotal = (discountAmount/100) * this.salesTotal;
  }

  
  clearCart(): void{
    this.salesTotal=0;
    this.salesTax=0;
    this.discountedTotal=0;
    this.cartItems = [];
  }
  
}
