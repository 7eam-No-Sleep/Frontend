import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Transaction } from '../transaction-history/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://127.0.0.1:8000/api/transactions'
  private currentTransactionsSubject: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([]);
  public currentTransactions$: Observable<Transaction[]> = this.currentTransactionsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.apiUrl);
  }
  addTransaction(newTransaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, newTransaction);
  }
}

