import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyModule } from './company/company.module';
import { HttpClientModule } from '@angular/common/http';
import { CountryModule } from './country/country.module';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';


import { EmployeeModule } from './employee/employee.module';
import { AdmindashboardComponent } from './adminDashboard/admindashboard/admindashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    AdmindashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CompanyModule,
    CountryModule,
    EmployeeModule,
    LoginModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
