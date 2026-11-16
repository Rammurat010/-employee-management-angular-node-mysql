import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Subject, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  takeUntil,
  finalize,
  startWith,
} from 'rxjs/operators';

import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  searchControl = new FormControl('', { nonNullable: true });

  loading = false;
  error = '';

  private destroy$ = new Subject<void>();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        startWith(this.searchControl.value),
        debounceTime(400),
        distinctUntilChanged(),

        switchMap((search) => {
          this.loading = true;
          this.error = '';

          return this.employeeService.getEmployees(search).pipe(
            catchError((error) => {
              this.error = error.error?.message || 'Unable to load employees';
              return of({
                success: false,
                message: this.error,
                data: [],
              });
            }),
            finalize(() => (this.loading = false)),
          );
        }),

        takeUntil(this.destroy$),
      )
      .subscribe((response) => {
        this.employees = response.data || [];
      });
  }

  deleteEmployee(id: number): void {
    if (!confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    this.employeeService
      .deleteEmployee(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.employees = this.employees.filter((emp) => emp.id !== id);
        },
        error: (error) => {
          this.error = error.error?.message || 'Delete failed';
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
