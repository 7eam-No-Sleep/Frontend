import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shift } from '../view-shifts/shift.model';


@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  private apiUrl = 'http://127.0.0.1:8000/api/shifts'

  constructor(private http: HttpClient) { }

  getShifts(): Observable<Shift[]>{
    return this.http.get<Shift[]>(this.apiUrl);
  }
}
