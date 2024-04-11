import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../view-staff/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://127.0.0.1:8000/api/employees'

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addEmployee (employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(this.apiUrl, employee)
  }
  updateEmployeeHours(employeeId: number, hours: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${employeeId}/hours`, {hours: hours});
  }
}
