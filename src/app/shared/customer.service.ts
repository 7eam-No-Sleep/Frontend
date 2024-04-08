import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../view-customers/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://127.0.0.1:8000/api/customers';

  constructor(private http: HttpClient) { }
  
  getCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.apiUrl);
  }

  addCustomer(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.apiUrl, customer);
  }
  getCustomerByPhoneNumber(phoneNumber: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${phoneNumber}`);
  }
  getCustomerById(CustomerID: number): Observable<Customer> {
    const url = `${this.apiUrl}/${CustomerID}`;
    return this.http.get<Customer>(url);
  }

  updateCustomer(customer: Customer): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${customer.CustomerID}`, customer);
  }
  
}