import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full',
  },

  {
    path: 'employees',
    loadComponent: () =>
      import('./pages/employee-list/employee-list.component').then(
        (m) => m.EmployeeListComponent,
      ),
  },

  {
    path: 'employees/add',
    loadComponent: () =>
      import('./pages/employee-add/employee-add.component').then(
        (m) => m.EmployeeAddComponent,
      ),
  },

  {
    path: 'employees/edit/:id',
    loadComponent: () =>
      import('./pages/employee-edit/employee-edit.component').then(
        (m) => m.EmployeeEditComponent,
      ),
  },

  {
    path: '**',
    redirectTo: 'employees',
  },
];
