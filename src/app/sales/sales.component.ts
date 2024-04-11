import { Component } from '@angular/core';
import { InventoryService } from '../shared/inventory.service';
import { CustomerService } from '../shared/customer.service';
import { FormsModule } from '@angular/forms';
import { SaleService } from '../shared/sale.service';
import { Inventory } from '../view-inventory/inventory.model';
import { CommonModule } from '@angular/common';
import { CardsService } from '../shared/cards.service';
import { GiftCard } from '../gift-cards/giftcard.model';
import { Customer } from '../view-customers/customer.model';
import { Sale } from './Sale.model';
import { Transaction } from '../transaction-history/transaction.model';
import { TransactionService } from '../shared/transaction.service';
import { ItemsService } from '../shared/items.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {
  ProductID: number = 0;
  CustomerPhoneNumber: string = '';
  discountAmount: number = 0;
  currentDate: Date = new Date();
  errorMessage: string = '';
  giftCard: GiftCard = { CardNumber: 0, Balance: 0, Status: '' };
  cardNumber: number = 0;
  cardBalanceUsed: number = 0;
  employee_id: number = this.getSaleId();
  CustomerID: number| null = null;
  CustomerName: string = '';
  PaymentMethod: string = '';
  formattedDate = this.currentDate.toISOString().split('T')[0];
  cashReceieved: number = 0;
  changeGiven: number = 0;
  checkNo: number = 0;

  constructor(
    private inventoryService: InventoryService,
    private customerService: CustomerService,
    public saleService: SaleService,
    private cardsService: CardsService,
    private transactionService: TransactionService,
    private itemsService: ItemsService
  ) {}

  fetchProduct(): void {
    this.inventoryService.getProductById(this.ProductID).subscribe({
      next: (product: Inventory) => {
        const costPrice = typeof product.CostPrice === 'string' ? parseFloat(product.CostPrice) : product.CostPrice;
        const sellingPrice = typeof product.SellingPrice === 'string' ? parseFloat(product.SellingPrice) : product.SellingPrice;
        if (product.QuantityInStock > 0) {
          this.errorMessage = '';
          this.saleService.addToCart({...product, CostPrice: costPrice, SellingPrice: sellingPrice });
        } else {
          this.errorMessage = 'Cannot Add Item, None In Stock';
        }
      },
      error: (error) => {
        console.log('Error fetching product:', error);
      }
    });
  }

  removeFromSale(product: Inventory): void {
    this.saleService.removeFromCart(product);
  }

  applyDiscount(amount: number): void {
    this.saleService.applyDiscount(amount);
  }

  fetchGiftCard(cardNumber: number): void {
    this.cardsService.getCardById(cardNumber).subscribe({
      next: (data) => {
        this.giftCard = data;
      },
      error: (err) => {
        console.log('error fecthing card: ', err);
      }
    });
  }

  calculateFinalTotal(): number {
    const itemTotal = this.saleService.ItemTotal;
    const discountAmount = this.saleService.discountAmount;
    const cardBalanceUsed =  this.cardBalanceUsed;
    const salesTax = (itemTotal - discountAmount) * 0.102;
    return itemTotal - discountAmount - cardBalanceUsed + salesTax;
  }

  fetchCustomer(phoneNumber: string): void {
    this.customerService.getCustomerByPhoneNumber(phoneNumber).subscribe({
      next: (customer: Customer) => {
        this.CustomerID = customer.CustomerID;
        this.CustomerName = customer.FirstName + ' '+customer.LastName;
      } 
    });
  }

  finalize(): void {
    const totalPrice = this.calculateTotalPrice();


    const newSale: Sale = {
      SaleID: 0,
      CustomerID: this.CustomerID,
      TotalPrice: totalPrice,
      Discount: this.discountAmount,
      employee_id: this.employee_id,
      ItemsSold: this.saleService.Items.length,
      SaleDate: this.formattedDate
    };

    this.saleService.finishSale(newSale).subscribe({
      next: (saleResponse) => {
        const saleID = saleResponse.SaleID;
        const newTransaction: Transaction = {
          TransactionID: 0,
          SaleID: saleID,
          CustomerID: this.CustomerID,
          TransactionDate: this.formattedDate,
          PaymentMethod: this.PaymentMethod,
          TotalAmount: totalPrice,
          CashReceived: this.cashReceieved,
          ChangeGiven: this.getChange(this.cashReceieved),
          CheckNumber: this.checkNo,
          CreditNumber: 0,
          ExpiryDate: ''
        };
        if(this.PaymentMethod != 'cash'){
          newTransaction.ChangeGiven = 0;
        }

        this.transactionService.addTransaction(newTransaction).subscribe({
          next: (transactionResponse) => {
            console.log('Transaction added:', transactionResponse);
            this.itemsService.addItemsForSale(saleID, this.saleService.Items);
            this.inventoryService.decreaseProductsByOne(this.saleService.Items);
            this.updateGiftCard(this.giftCard);
            this.clearFields();
          
          },
          error: (transactionError) => {
            console.error('Error adding transaction:', transactionError);
          }
        });
      },
      error: (saleError) => {
        console.error('Error finalizing sale:', saleError);
      }
    });
  }

  calculateTotalPrice(): number {
    const itemTotal = this.saleService.ItemTotal;
    const discountAmount = this.saleService.discountAmount;
    const salesTax = (itemTotal - discountAmount) * 0.102;
    return parseFloat((itemTotal - discountAmount + salesTax).toFixed(2));
  }

  getChange(cash: number): number {
    return cash - this.calculateFinalTotal();
  }

  updateGiftCard(card: GiftCard): void {
    if (card.CardNumber !== 0) { // Check if CardNumber is not 0
      const updatedBalance = card.Balance - this.cardBalanceUsed;
      card.Balance = updatedBalance < 0 ? 0 : updatedBalance; // Ensure balance is not negative
      this.cardsService.updateCard(card).subscribe(
        (updatedCard) => {
          console.log('Gift card updated successfully:', updatedCard);
          // Optionally, you can emit an event or perform other actions upon successful update
        },
        (error) => {
          console.error('Error updating gift card:', error);
          // Handle the error appropriately, such as displaying an error message to the user
        }
      );
    } else {
      console.warn('Invalid CardNumber. Skipping gift card update.');
    }
  }

  clearFields(): void {
    this.ProductID = 0;
    this.CustomerPhoneNumber = '';
    this.discountAmount = 0;
    this.errorMessage = '';
    this.giftCard = { CardNumber: 0, Balance: 0, Status: '' };
    this.cardNumber = 0;
    this.cardBalanceUsed = 0;
    this.CustomerID = null;
    this.CustomerName = '';
    this.PaymentMethod = '';
    this.cashReceieved = 0;
    this.changeGiven = 0;
    this.checkNo = 0;
    this.saleService.clearCart(); // Assuming you have a method to clear the cart in SaleService
  }

  getSaleId(): number {
    const userId = localStorage.getItem('userID');
    // Parse the retrieved value as a number
    return userId ? parseInt(userId, 10) : 0; // Return 0 if userId is null or undefined
  }
}