import { Component } from '@angular/core';
import { Transaction } from '../transaction-history/transaction.model';
import { Items } from '../sales/Items.model';
import { FormsModule } from '@angular/forms';
import { ItemsService } from '../shared/items.service';
import { TransactionService } from '../shared/transaction.service';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../shared/inventory.service';
import { GiftCard } from '../gift-cards/giftcard.model';
import { CardsService } from '../shared/cards.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-process-returns',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './process-returns.component.html',
  styleUrl: './process-returns.component.css'
})
export class ProcessReturnsComponent {

  constructor(
    private itemService: ItemsService,
    private transactionService: TransactionService,
    private inventoryService: InventoryService,
    private cardsService: CardsService
  ){}

  transactionId: number = 0;
  thisTransaction: Transaction ={
    TransactionID: 0, SaleID: 0, CustomerID: 0, TransactionDate: '', PaymentMethod: '', 
    TotalAmount: 0, CashReceived: 0, ChangeGiven: 0, CheckNumber: 0, CreditNumber: 0, ExpiryDate: ''
  }
  Items: Items[] = [];
  returnTotal: number = 0;
  Returns: Items[] = [];
  cardNumber: number = 0;
  cardBalance: number = 0;
  productName: string = '';

  getTransactionById (tID: number): void{
    this.transactionService.getTransactionByID(tID).subscribe({
      next: (transaction: Transaction)=>{
        this.thisTransaction = transaction;
        this.getItemsByID(this.thisTransaction.SaleID);
      },
      error: (error)=>{
        console.log('Error fetching transaction', error)
      }
    });
    }

    getItemsByID (sID: number): void{
      this.itemService.getItemsBySaleId(sID).subscribe({
        next: (items) =>{
          this.Items = [...this.Items, ...items];
        },
        error: (err) =>{
          console.error('Error Fetchign Items: ', err);
        }
      })
    }
    addToReturns(item: any): void { // Consider typing 'item' more strictly if possible
      this.Returns.push(item);
    
      // Parse the PricePerItem string to a float
      const price = parseFloat(item.PricePerItem);
      if (!isNaN(price)) { // Ensure the parsed price is a number
        // Use toFixed(2) to round the price to 2 decimal places and parse it back to a float
        this.returnTotal = parseFloat((this.returnTotal + price).toFixed(2));
      } else {
        // Handle the case where PricePerItem is not a valid float string
        console.error('Invalid price for item:', item);
      }
    }
    addGiftCard(number: number, balance: string): void{
      const newBalance = parseFloat(balance)
      const newGiftCard: GiftCard={
        CardNumber: number,
        Balance: newBalance,
        Status: 'Active'
      }
      this.cardsService.addCard(newGiftCard).subscribe({
        next: (giftcard: GiftCard)=>{
          console.log('Added Gift Card', giftcard);
        },
        error: (error)=>{
          console.log('Error adding gift card', error);
        }
      }
      );
      this.clear();
    }
    clear(): void {
      // Reset the transaction ID and related transaction information
      this.transactionId = 0;
      this.thisTransaction = {
        TransactionID: 0, 
        SaleID: 0, 
        CustomerID: 0, 
        TransactionDate: '', 
        PaymentMethod: '', 
        TotalAmount: 0, 
        CashReceived: 0, 
        ChangeGiven: 0, 
        CheckNumber: 0, 
        CreditNumber: 0, 
        ExpiryDate: ''
      };
    
      // Clear the list of items and returns
      this.Items = [];
      this.Returns = [];
      
      // Reset the return total
      this.returnTotal = 0;
    
      // If you're keeping track of a specific gift card, reset its number and balance
      this.cardNumber = 0;
      this.cardBalance = 0;
    }
  }
 

