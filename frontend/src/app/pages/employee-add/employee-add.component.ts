import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css',
})
export class EmployeeAddComponent {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);

  loading = false;
  error = '';

  employeeForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
    department: ['', Validators.required],
    salary: [0, [Validators.required, Validators.min(1)]],
    joining_date: ['', Validators.required],
    status: this.fb.nonNullable.control<'Active' | 'Inactive'>('Active'),
  });

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
          this.loading = false;
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.error?.message || 'Unable to add employee';
        },
      });
  }
}
