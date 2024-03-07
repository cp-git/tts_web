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
import { ChangeHistoryComponent } from './reason/components/change-history/change-history.component';
import { ForgotPasswordComponent } from './login/components/forgot-password/forgot-password.component';
import { HomeComponent } from './home/home/home.component';
import { StatusComponent } from './status/components/status/status.component';
import { AddStatusComponent } from './status/components/add-status/add-status.component';
import { UpdateStatusComponent } from './status/components/update-status/update-status.component';
import { AddportalComponent } from './jobportal/components/addportal/addportal.component';
import { JobportalComponent } from './jobportal/components/jobportal/jobportal.component';
import { UpdateportalComponent } from './jobportal/components/updateportal/updateportal.component';
import { UpdatevisaComponent } from './visa/component/updatevisa/updatevisa.component';
import { AddvisaComponent } from './visa/component/addvisa/addvisa.component';
import { AddtaxtypeComponent } from './taxtype/components/addtaxtype/addtaxtype.component';
import { UpdatetaxtypeComponent } from './taxtype/components/updatetaxtype/updatetaxtype.component';
import { UpdatejoblocationComponent } from './joblocation/components/updatejoblocation/updatejoblocation.component';
import { AddjoblocationComponent } from './joblocation/components/addjoblocation/addjoblocation.component';
import { HiringCompanyComponent } from './hiring-company/components/hiring-company/hiring-company.component';
import { UpdateHiringCompanyComponent } from './hiring-company/components/update-hiring-company/update-hiring-company.component';
import { CreateHiringCompanyComponent } from './hiring-company/components/create-hiring-company/create-hiring-company.component';
import { BenchCandidateComponent } from './bench-candidate/components/bench-candidate/bench-candidate.component';
import { CreateBenchCandidateComponent } from './bench-candidate/components/create-bench-candidate/create-bench-candidate.component';
import { UpdateBenchCandidateComponent } from './bench-candidate/components/update-bench-candidate/update-bench-candidate.component';
import { ReportgenComponent } from './generatepdf/components/reportgen/reportgen.component';
import { ChangepasswordComponent } from './login/components/changepassword/changepassword.component';
const routes: Routes = [
  { path: 'employee', component: EmployeeComponent },
  { path: 'createEmp', component: CreateEmployeeComponent },
  { path: 'updateEmp', component: UpdateEmployeeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'addCompany', component: AddCompanyComponent },
  { path: 'update', component: UpdateCompanyComponent },
  { path: 'country', component: CountryComponent },
  { path: 'addCountry', component: AddCountryComponent },
  { path: 'updateCountry', component: UpdateCountryComponent },
  { path: 'adminDash', component: AdmindashboardComponent },
  { path: 'dashboard/changehistory/:id', component: ChangeHistoryComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: '', component: HomeComponent },
  { path: 'status', component: StatusComponent },
  { path: 'addStatus', component: AddStatusComponent },
  { path: 'updateStatus', component: UpdateStatusComponent },
  { path: 'addPortal', component: AddportalComponent },
  { path: 'portal', component: JobportalComponent },
  { path: 'updatePortal', component: UpdateportalComponent },
  { path: 'updateVisa', component: UpdatevisaComponent },
  { path: 'addVisa', component: AddvisaComponent },
  { path: 'addTaxType', component: AddtaxtypeComponent },
  { path: 'updateTaxType', component: UpdatetaxtypeComponent },
  { path: 'addLocation', component: AddjoblocationComponent },
  { path: 'updateLocation', component: UpdatejoblocationComponent },

  { path: 'hiringcompany', component: HiringCompanyComponent },
  { path: 'addhc', component: CreateHiringCompanyComponent },
  { path: 'updatehc', component: UpdateHiringCompanyComponent },
  { path: 'benchcand', component: BenchCandidateComponent },
  { path: 'addbenchcand', component: CreateBenchCandidateComponent },
  { path: 'updatebenchcand', component: UpdateBenchCandidateComponent },
  { path: 'report', component: ReportgenComponent },
  { path: 'changePass', component: ChangepasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
