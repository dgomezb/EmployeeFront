import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../interfaces/employee.interface';
import { catchError, map } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'employee-search',
  templateUrl: './employee-search.component.html',
  styleUrl: './employee-search.component.css'
})
export class EmployeeSearchComponent {
  
  public employeeId: string = '';
  public employeesArray: Employee[] = [];
  public employeeObj = <Employee> {};
  public isLoading: boolean = false;

  constructor(private employesService: EmployeeService) {}

  public searchEmployees(): void {
    this.isLoading = true;
    this.employeesArray = [];
    this.employeeObj = <Employee>{};

    if (!isNaN(parseInt(this.employeeId))) {
      this.getEmployeeById(this.employeeId);
    } else {
        if (this.employeeId.trim() !== '') {return;}
      this.getEmployees();
    }

  }

  private getEmployees(): void {
    
    this.employesService.getEmployees()
    .pipe(
      catchError(error => {
        console.error('Error getting employees from service: ', error);
        this.isLoading = false;
        return of(this.employeesArray)
      })
    ).subscribe(employees => {
      this.employeesArray = employees
      this.isLoading = false;
    });
  }

  private getEmployeeById(id: string): void {
    
    this.employesService.getEmployeeById(id)
    .pipe(
      catchError(error => {
        console.error('Error getting employees from service: ', error);
        this.isLoading = false;
        return of(this.employeeObj)
      })
    ).subscribe(employees => {
      this.employeesArray.unshift(employees)
      this.isLoading = false;
    });
  }

}
