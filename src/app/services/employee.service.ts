import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  private SERVICE_URL: string = 'http://localhost:5190';

  private employeesEndPoint: string = '/api/Employee/GetEmployees';
  private employeeByIdEndPoint: string = '/api/Employee/';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.SERVICE_URL}${this.employeesEndPoint}`);
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.SERVICE_URL}${this.employeeByIdEndPoint}${id}`);
  }


}
