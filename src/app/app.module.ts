import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyModule } from './company/company.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { AuthLoginModule } from './auth-login/auth-login.module';
import { AuthInterceptor } from './service/auth-interceptor/auth-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
  ],
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
    AuthLoginModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
