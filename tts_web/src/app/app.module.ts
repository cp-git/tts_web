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
import { JobportalModule } from './jobportal/jobportal.module';
import { VisaComponent } from './visa/component/visa/visa.component';
import { AddvisaComponent } from './visa/component/addvisa/addvisa.component';
import { UpdatevisaComponent } from './visa/component/updatevisa/updatevisa.component';
import { TaxtypeComponent } from './taxtype/components/taxtype/taxtype.component';
import { AddtaxtypeComponent } from './taxtype/components/addtaxtype/addtaxtype.component';
import { UpdatetaxtypeComponent } from './taxtype/components/updatetaxtype/updatetaxtype.component';
import { JoblocationComponent } from './joblocation/components/joblocation/joblocation.component';
import { AddjoblocationComponent } from './joblocation/components/addjoblocation/addjoblocation.component';
import { UpdatejoblocationComponent } from './joblocation/components/updatejoblocation/updatejoblocation.component';

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


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
