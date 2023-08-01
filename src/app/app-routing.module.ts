import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/components/company/company.component';
import { AddCompanyComponent } from './company/components/add-company/add-company.component';
import { UpdateCompanyComponent } from './company/components/update-company/update-company.component';
const routes: Routes = [
  { path: 'company', component: CompanyComponent },
  { path: 'addCompany', component: AddCompanyComponent },
  { path: 'update', component: UpdateCompanyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
