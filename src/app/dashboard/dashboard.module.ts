import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { StatusButtonsComponent } from './components/status-buttons/status-buttons.component';
import { TaskModule } from '../task/task.module';
import { FooterModule } from '../footer/footer.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    DashboardComponent,
    StatusButtonsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TaskModule,
    FooterModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class DashboardModule { }
