import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css',
})
export class EmployeeEditComponent implements OnInit, OnDestroy {
  employeeForm!: FormGroup;
  employeeId = 0;
  loading = false;
  loaded = false;
  error = '';

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.employeeForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      department: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(1)]],
      joining_date: ['', Validators.required],
      status: this.fb.nonNullable.control<'Active' | 'Inactive'>('Active'),
    });
  }

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(this.employeeId) || this.employeeId <= 0) {
      this.error = 'Invalid employee ID';
      return;
    }

    this.loadEmployee();
  }

  loadEmployee(): void {
    this.loading = true;

    this.employeeService
      .getEmployeeById(this.employeeId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.data) {
            this.employeeForm.patchValue(response.data);
            this.loaded = true;
          } else {
            this.error = 'Employee not found';
          }

          this.loading = false;
        },
        error: (error) => {
          this.error = error.error?.message || 'Unable to load employee';
          this.loading = false;
        },
      });
  }

  updateEmployee(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    this.employeeService
      .updateEmployee(this.employeeId, this.employeeForm.getRawValue())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.error?.message || 'Update failed';
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
