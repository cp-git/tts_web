import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { StatusButtonsComponent } from './components/status-buttons/status-buttons.component';
import { TaskModule } from '../task/task.module';



@NgModule({
  declarations: [
    DashboardComponent,
    StatusButtonsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TaskModule
  ]
})
export class DashboardModule { }
