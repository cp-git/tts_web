import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/components/employee/employee.component';
import { CreateEmployeeComponent } from './employee/components/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './employee/components/update-employee/update-employee.component';
import { LoginComponent } from './login/components/login/login.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
const routes: Routes = [
  { path: 'employee', component: EmployeeComponent },
  { path: 'createEmp', component: CreateEmployeeComponent },
  { path: 'updateEmp', component: UpdateEmployeeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
