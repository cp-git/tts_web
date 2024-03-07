import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterModule } from 'src/app/footer/footer.module';
import { HeaderModule } from 'src/app/header/header.module';




@NgModule({
  declarations: [
    AdmindashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    FooterModule,
    HeaderModule
  ],
  exports: [
    AdmindashboardComponent
  ]
})
export class AdminModule { }
