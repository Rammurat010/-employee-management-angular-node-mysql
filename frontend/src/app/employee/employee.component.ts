import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];

  employee: Employee = this.emptyForm();

  isEdit = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  emptyForm(): Employee {
    return {
      name: '',
      email: '',
      phone: '',
      department: '',
      salary: 0,
    };
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => (this.employees = data),
      error: (err) => console.error(err),
    });
  }

  saveEmployee(): void {
    if (!this.employee.name || !this.employee.email) {
      alert('Name and Email are required');
      return;
    }

    if (this.isEdit && this.employee.id) {
      this.employeeService
        .updateEmployee(this.employee.id, this.employee)
        .subscribe({
          next: () => {
            alert('Employee updated');
            this.resetForm();
            this.getEmployees();
          },
          error: (err) => console.error(err),
        });
    } else {
      this.employeeService.addEmployee(this.employee).subscribe({
        next: () => {
          alert('Employee added');
          this.resetForm();
          this.getEmployees();
        },
        error: (err) => console.error(err),
      });
    }
  }

  editEmployee(data: Employee): void {
    this.employee = { ...data };
    this.isEdit = true;
  }

  deleteEmployee(id?: number): void {
    if (!id || !confirm('Are you sure you want to delete?')) {
      return;
    }

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        alert('Employee deleted');
        this.getEmployees();
      },
      error: (err) => console.error(err),
    });
  }

  resetForm(): void {
    this.employee = this.emptyForm();
    this.isEdit = false;
  }
}
