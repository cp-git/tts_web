import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/components/company/company.component';
import { AddCompanyComponent } from './company/components/add-company/add-company.component';
import { UpdateCompanyComponent } from './company/components/update-company/update-company.component';
import { CountryComponent } from './country/components/country/country.component';
import { AddCountryComponent } from './country/components/add-country/add-country.component';
import { UpdateCountryComponent } from './country/components/update-country/update-country.component';
const routes: Routes = [
  { path: 'company', component: CompanyComponent },
  { path: 'addCompany', component: AddCompanyComponent },
  { path: 'update', component: UpdateCompanyComponent },
  { path: 'country', component: CountryComponent },
  { path: 'addCountry', component: AddCountryComponent },
  { path: 'updateCountry', component: UpdateCountryComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
