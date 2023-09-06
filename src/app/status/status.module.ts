import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './components/status/status.component';
import { FormsModule } from '@angular/forms';

import { AddStatusComponent } from './components/add-status/add-status.component';
import { UpdateStatusComponent } from './components/update-status/update-status.component';
import { AdmindashboardComponent } from '../adminDashboard/admindashboard/admindashboard.component';
import { RouterModule } from '@angular/router';
import { AdminModule } from '../adminDashboard/admin/admin.module';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';



@NgModule({
  declarations: [
    StatusComponent,
    AddStatusComponent,
    UpdateStatusComponent
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
export class StatusModule { }
