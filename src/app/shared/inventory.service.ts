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
}

