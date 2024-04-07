import { Component } from '@angular/core';
import { InventoryService } from '../../shared/inventory.service';
import { TransactionService } from '../../shared/transaction.service';
import { SaleService } from '../../shared/sale.service';
import { Inventory } from '../../view-inventory/inventory.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-left-column',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './left-column.component.html',
  styleUrl: './left-column.component.css'
})
export class LeftColumnComponent {
  productID: number = 0;
  product: Inventory = {
    ProductID: 0, ProductName: '', Category: '', Description: '', CostPrice: 0, SellingPrice: 0, QuantityInStock: 0, Color: '', Size: '', Material: ''
  }
  discountAmount: number =0;

  constructor(private inventoryService: InventoryService, private saleService: SaleService){}


  fetchProductById(): void {
    if (!this.productID || this.productID <= 0) {
      console.log('Please enter a valid product ID.');
      return;
    }
    
    this.inventoryService.getProductById(this.productID).subscribe({
      next: (product: Inventory) => {
        console.log('Product fetched:', product);
        const costPrice = typeof product.CostPrice === 'string' ? parseFloat(product.CostPrice) : product.CostPrice;
        const sellingPrice = typeof product.SellingPrice === 'string' ? parseFloat(product.SellingPrice) : product.SellingPrice;
        this.saleService.addToCard({ ...product, CostPrice: costPrice, SellingPrice: sellingPrice }); 
      },
      error: (error) => {
        console.log('Error fetching product:', error);
      }
    });
  }

  applyDiscount(): void{
    if (this.discountAmount>0){
      this.saleService.applyDiscount(this.discountAmount);
    }

  }


}


