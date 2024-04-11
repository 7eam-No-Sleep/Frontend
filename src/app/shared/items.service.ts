import { Injectable } from '@angular/core';
import { Items } from '../sales/Items.model';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { SaleService } from './sale.service';
import { delay, catchError, concatMap} from 'rxjs/operators';
import { Inventory } from '../view-inventory/inventory.model';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient,
    private saleService: SaleService
  ) { }

  private apiUrl = 'http://127.0.0.1:8000/api/items_sold';

  addItemsForSale(saleID: number, inventoryItems: Inventory[]): void {
    // Iterate through each inventory item and post it individually
    inventoryItems.forEach(item => {
      const newItem: Items = {
        SaleID: saleID,
        ProductID: item.ProductID,
        QuantitySold: 1, // Assuming quantity sold is always 1 for each inventory item
        PricePerItem: item.SellingPrice // Assuming selling price is used as price per item
      };
      this.http.post<void>(this.apiUrl, newItem).subscribe(
        () => {
          console.log('Item posted successfully:', newItem);
        },
        (error) => {
          console.error('Error posting item:', error);
        }
      );
    });
  }


 
}



