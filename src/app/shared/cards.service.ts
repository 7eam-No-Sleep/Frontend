import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GiftCard } from '../gift-cards/giftcard.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private apiUrl = 'http://127.0.0.1:8000/api/cards'

  constructor(private http: HttpClient) { }

  getCards (): Observable<GiftCard[]>{
    return this.http.get<GiftCard[]>(this.apiUrl);
  }
}
