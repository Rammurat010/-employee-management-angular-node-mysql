import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Employee,
  EmployeeResponse,
  SingleEmployeeResponse,
} from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5000/api/employees';

  constructor(private http: HttpClient) {}

  // GET All + Search
  getEmployees(search = ''): Observable<EmployeeResponse> {
    const params = new HttpParams().set('search', search);

    return this.http.get<EmployeeResponse>(this.apiUrl, { params });
  }

  // GET By ID
  getEmployeeById(id: number): Observable<SingleEmployeeResponse> {
    return this.http.get<SingleEmployeeResponse>(`${this.apiUrl}/${id}`);
  }

  // POST
  addEmployee(data: Partial<Employee>): Observable<EmployeeResponse> {
    return this.http.post<EmployeeResponse>(this.apiUrl, data);
  }

  // PUT
  updateEmployee(
    id: number,
    data: Partial<Employee>,
  ): Observable<EmployeeResponse> {
    return this.http.put<EmployeeResponse>(`${this.apiUrl}/${id}`, data);
  }

  // DELETE
  deleteEmployee(id: number): Observable<EmployeeResponse> {
    return this.http.delete<EmployeeResponse>(`${this.apiUrl}/${id}`);
  }
}
