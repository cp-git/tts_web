import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/components/company/company.component';
import { AddCompanyComponent } from './company/components/add-company/add-company.component';
import { UpdateCompanyComponent } from './company/components/update-company/update-company.component';
import { CountryComponent } from './country/components/country/country.component';
import { AddCountryComponent } from './country/components/add-country/add-country.component';
import { UpdateCountryComponent } from './country/components/update-country/update-country.component';
import { EmployeeComponent } from './employee/components/employee/employee.component';
import { CreateEmployeeComponent } from './employee/components/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './employee/components/update-employee/update-employee.component';
import { LoginComponent } from './login/components/login/login.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { AdmindashboardComponent } from './adminDashboard/admindashboard/admindashboard.component';
const routes: Routes = [
  { path: 'employee', component: EmployeeComponent },
  { path: 'createEmp', component: CreateEmployeeComponent },
  { path: 'updateEmp', component: UpdateEmployeeComponent },
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'addCompany', component: AddCompanyComponent },
  { path: 'update', component: UpdateCompanyComponent },
  { path: 'country', component: CountryComponent },
  { path: 'addCountry', component: AddCountryComponent },
  { path: 'updateCountry', component: UpdateCountryComponent },
  { path: 'adminDash', component: AdmindashboardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
