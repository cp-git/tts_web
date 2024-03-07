import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiringCompanyComponent } from './components/hiring-company/hiring-company.component';
import { CreateHiringCompanyComponent } from './components/create-hiring-company/create-hiring-company.component';
import { UpdateHiringCompanyComponent } from './components/update-hiring-company/update-hiring-company.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
import { AdminModule } from '../adminDashboard/admin/admin.module';

@NgModule({
  declarations: [
    HiringCompanyComponent,
    CreateHiringCompanyComponent,
    UpdateHiringCompanyComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    FooterModule,
    HeaderModule,
  ],
})
export class HiringCompanyModule {}
