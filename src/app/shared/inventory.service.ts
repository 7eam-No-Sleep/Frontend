import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../view-inventory/inventory.model';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl = 'http://127.0.0.1:8000/api/inventory';

  constructor(private http: HttpClient) { }

  getInventory(): Observable<Inventory[]>{
    return this.http.get<Inventory[]>(this.apiUrl);
  }

  addInventory(inventory: Inventory): Observable<Inventory>{
    return this.http.post<Inventory>(this.apiUrl, inventory);
  }

  getProductById(ProductID: number): Observable<Inventory> {
    const url = `${this.apiUrl}/${ProductID}`;
    return this.http.get<Inventory>(url);
  }
  updateProduct(product: Inventory): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/products/${product.ProductID}`, product);
  }

  decreaseProductsByOne(inventoryItems: Inventory[]): void{
    inventoryItems.forEach(item=>{
      const updatedItem: Inventory ={
        ProductID: item.ProductID,
        ProductName: item.ProductName,
        Category: item.Category,
        Description: item.Description,
        CostPrice: item.CostPrice,
        SellingPrice: item.SellingPrice,
        QuantityInStock: (item.QuantityInStock-1),
        Color: item.Color,
        Size: item.Size,
        Material: item.Material
      };
      this.http.put<any>(`${this.apiUrl}/products/${item.ProductID}`, updatedItem).subscribe(
        ()=>{
          console.log('Product succesfully updated: ', updatedItem);
        },
        (error)=>{
          console.error('error updating product:', error);
        }
      )
    })
  }
}

