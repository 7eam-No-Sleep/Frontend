import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SaleService } from '../../shared/sale.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Inventory } from '../../view-inventory/inventory.model';

@Component({
  selector: 'app-mid-column',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mid-column.component.html',
  styleUrl: './mid-column.component.css'
})
export class MidColumnComponent {
  itemTotal: number = 0;
  salesTaxAmount: number = 0;
  public finalTotal: number = 0;
  productsInCart: Inventory[] = [];

  constructor(public saleService: SaleService) { }

  calcuateFinalTotal(): void {
    const salesTotalMid = this.saleService.salesTotal;
    const discountedTotal = this.saleService.discountedTotal;

    // Calculate sales tax
    const salesTax = (salesTotalMid - discountedTotal) * 0.125;

    // Calculate final total and round to two decimal places
    this.finalTotal = +(salesTotalMid - discountedTotal + salesTax).toFixed(2);
    
    this.saleService.salesTotal = this.finalTotal;
}


}