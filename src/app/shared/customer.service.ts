import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../view-customers/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://127.0.0.1:8000/api/customer';

  constructor(private http: HttpClient) { }
  
  getCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.apiUrl);
  }

  addCustomer(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.apiUrl, customer);
  }

 
}