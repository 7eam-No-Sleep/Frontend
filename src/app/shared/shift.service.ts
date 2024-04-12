import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shift } from '../view-shifts/shift.model';
import { catchError, tap } from 'rxjs';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';


@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  private apiUrl = 'http://127.0.0.1:8000/api/shift'

  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  currentShift: Shift = {
    shift_id: 0,
    employee_id: 0,
    shift_time: 0,
    shift_date: '',
    total_transactions: 0,
    total_cash: 0,
    total_card_sales: 0,
    total_checks: 0,
    total_sales: 0,
  };
  starttime: string = '';
  endtime: string = '';
  currentDate: Date = new Date();
  formattedDate = this.currentDate.toISOString().split('T')[0];


  getShifts(): Observable<Shift[]>{
    return this.http.get<Shift[]>(this.apiUrl);
  }

  startShift(): void {
    const now = new Date();
    this.starttime = now.toLocaleTimeString();
    localStorage.setItem('startTime', this.starttime); // Save the start time
    localStorage.setItem('startDate', this.formattedDate); // Save the start date
  }


  endShift(): void {
    const now = new Date();
    this.endtime = now.toLocaleTimeString();
    this.finalizeShift(); // Directly call the finalizeShift method.
    localStorage.removeItem('startTime'); // Clear the start time
    localStorage.removeItem('startDate'); // Clear the start date
  }

  addTransaction(): void{
    this.currentShift.total_transactions +=1;
  }
  addCash(cash: number): void{
    this.currentShift.total_cash += cash;
  }
  addCard (card: number): void{
    this.currentShift.total_card_sales += card;
  }
  addCheck (check: number): void{
    this.currentShift.total_checks +=check;
  }
  addSales (sales: number): void{
    this.currentShift.total_sales +=sales;
  }
  finalizeShift(): void {
    const startDateStr = localStorage.getItem('startDate') || this.formattedDate;
    const startTime = localStorage.getItem('startTime') || this.starttime;
    
    const startDate = new Date(`${startDateStr} ${startTime}`);
    const endDate = new Date(`${this.formattedDate} ${this.endtime}`);
    const diff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    this.currentShift.shift_time = parseFloat(diff.toFixed(2)); 

    this.currentShift.employee_id = this.getSaleId();
    this.currentShift.shift_date = startDateStr;

    this.http.post<Shift>(this.apiUrl, this.currentShift).subscribe({
      next: (response) => {
        const hoursToAdd = this.currentShift.shift_time;
        this.employeeService.updateEmployeeHours(this.currentShift.employee_id, hoursToAdd).subscribe({
          next: (updateResponse) => {
            this.authService.logout();
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error("Error updating employee hours:", err);
          }
        });
      },
      error: (err) => {
        console.error("Error posting shift:", err);
      }
    });
  }



  getSaleId(): number {
    const userId = localStorage.getItem('userID');
    // Parse the retrieved value as a number
    return userId ? parseInt(userId, 10) : 0; // Return 0 if userId is null or undefined
  }
  clear(): void {
    this.currentShift = {
      shift_id: 0,
      employee_id: 0,
      shift_time: 0,
      shift_date: '',
      total_transactions: 0,
      total_cash: 0,
      total_checks: 0,
      total_card_sales: 0,
      total_sales: 0,
    };
    this.starttime = '';
    this.endtime = '';
  }
  getShiftById(shift_id: number): Observable<Shift>{
    const url = `${this.apiUrl}/${shift_id}}`;
    return this.http.get<Shift>(url);
  }
  updateShift(shift: Shift): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${shift.shift_id}`, shift);
  }
}