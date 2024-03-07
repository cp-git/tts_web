import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './components/country/country.component';
import { AddCountryComponent } from './components/add-country/add-country.component';
import { FormsModule } from '@angular/forms';
import { UpdateCountryComponent } from './components/update-country/update-country.component';
import { CompanyComponent } from '../company/components/company/company.component';
import { RouterModule } from '@angular/router';
import { AdmindashboardComponent } from '../adminDashboard/admindashboard/admindashboard.component';
import { CompanyModule } from '../company/company.module';
import { AdminModule } from '../adminDashboard/admin/admin.module';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';



@NgModule({
  declarations: [
    CountryComponent,
    AddCountryComponent,
    UpdateCountryComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CompanyModule,
    AdminModule,
    FooterModule,
    HeaderModule
  ]
})
export class CountryModule { }
