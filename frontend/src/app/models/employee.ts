export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  salary: number;
  joining_date: string;
  status: 'Active' | 'Inactive';
  created_at?: string;
}

export interface EmployeeResponse {
  success: boolean;
  message: string;
  data?: Employee[];
  employeeId?: number;
}

export interface SingleEmployeeResponse {
  success: boolean;
  message: string;
  data?: Employee;
}
