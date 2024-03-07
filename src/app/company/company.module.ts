import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './components/company/company.component';
import { FormsModule } from '@angular/forms';

import { AddCompanyComponent } from './components/add-company/add-company.component';
import { UpdateCompanyComponent } from './components/update-company/update-company.component';
import { AdmindashboardComponent } from '../adminDashboard/admindashboard/admindashboard.component';
import { RouterModule } from '@angular/router';
import { AdminModule } from '../adminDashboard/admin/admin.module';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';



@NgModule({
  declarations: [
    CompanyComponent,

    AddCompanyComponent,
    UpdateCompanyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AdminModule,
    FooterModule,
    HeaderModule
  ]
})
export class CompanyModule { }
