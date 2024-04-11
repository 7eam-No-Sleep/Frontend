import { Injectable } from '@angular/core';
import { Inventory } from '../view-inventory/inventory.model';
import { InventoryService } from './inventory.service';
import { CustomerService } from './customer.service';
import { HttpClient } from '@angular/common/http';
import { Sale } from '../sales/Sale.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SaleService {
  public Items: Inventory[] = [];
  public ItemTotal: number = 0;
  public SalesTaxRate: number = 0.102;
  public finalTotal: number = 0;
  public discountAmount: number = 0;

  private apiUrl = 'http://127.0.0.1:8000/api/sales';

  constructor(private http: HttpClient) { }

  addToCart(item: Inventory): void {
    this.Items.push(item);
    this.ItemTotal += item.SellingPrice; 
    this.calculateFinalTotal  
  }
  removeFromCart(item: Inventory): void {
    const index = this.Items.findIndex(cartItem => cartItem.ProductID === item.ProductID);
    if (index !== -1) {
      this.Items.splice(index, 1);
      this.ItemTotal -= item.SellingPrice;
      this.calculateFinalTotal
    }
  }
  clearCart(): void {
    this.Items = [];
    this.ItemTotal = 0;
    this.SalesTaxRate = 0;
    this.discountAmount = 0;
    this.finalTotal = 0;
  }
  calculateFinalTotal(): void {
    const salesTax = this.ItemTotal * this.SalesTaxRate;
    this.finalTotal = this.ItemTotal + salesTax;
  }
  applyDiscount(discountAmount: number): void{
    this.discountAmount = (discountAmount/100) * this.ItemTotal;
  }
  finishSale(sale: Sale):  Observable<Sale>{
    return this.http.post<Sale>(this.apiUrl, sale);
  }



}
