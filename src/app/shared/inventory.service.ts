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
}
