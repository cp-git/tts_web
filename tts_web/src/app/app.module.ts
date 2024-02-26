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
import { AdminModule } from './adminDashboard/admin/admin.module';
import { HeaderModule } from './header/header.module';
import { TaskModule } from './task/task.module';
import { HomeModule } from './home/home.module';
import { ReasonModule } from './reason/reason.module';
import { StatusModule } from './status/status.module';
import { HiringCompanyModule } from './hiring-company/hiring-company.module';
import { BenchCandidateModule } from './bench-candidate/bench-candidate.module';
import { ReportgenComponent } from './generatepdf/components/reportgen/reportgen.component';
import { RepotgenModule } from './generatepdf/repotgen/repotgen.module';
import { BackupComponent } from './backup/backup/backup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AppComponent, BackupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    CompanyModule,
    CountryModule,
    EmployeeModule,
    HomeModule,
    StatusModule,
    LoginModule,
    DashboardModule,
    AdminModule,
    HeaderModule,
    TaskModule,
    ReasonModule,
    HiringCompanyModule,
    BenchCandidateModule,
    RepotgenModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
