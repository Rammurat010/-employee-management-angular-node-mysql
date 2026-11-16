import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css',
})
export class EmployeeAddComponent {
  loading = false;
  error = '';

  employeeForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.pattern(/^[0-9]{10,15}$/)],
    department: ['', Validators.required],
    salary: [0, [Validators.required, Validators.min(1)]],
    joining_date: ['', Validators.required],
    status: ['Active'],
  });

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
  ) {}

  submit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    this.employeeService
      .addEmployee(this.employeeForm.getRawValue())
      .subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          this.error = error.error?.message || 'Unable to add employee';
          this.loading = false;
        },
      });
  }
}
