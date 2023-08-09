import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './components/employee/employee.component';
import { FormsModule } from '@angular/forms';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EmployeeComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ]
})
export class EmployeeModule { }
