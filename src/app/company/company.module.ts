import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company/company.component';
import { FormsModule } from '@angular/forms';

import { AddCompanyComponent } from './components/add-company/add-company.component';
import { UpdateCompanyComponent } from './components/update-company/update-company.component';



@NgModule({
  declarations: [
    CompanyComponent,

    AddCompanyComponent,
    UpdateCompanyComponent,

  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CompanyModule { }
