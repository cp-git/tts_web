import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/components/company/company.component';
import { EmployeeComponent } from './employee/components/employee/employee.component';
import { CreateEmployeeComponent } from './employee/components/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './employee/components/update-employee/update-employee.component';
const routes: Routes = [
  { path: 'company', component: CompanyComponent },
  {path:'employee',component:EmployeeComponent},
  {path:'createEmp',component:CreateEmployeeComponent},
  {path:'updateEmp',component:UpdateEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
