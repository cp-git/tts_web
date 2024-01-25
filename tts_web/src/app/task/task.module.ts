import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { FormsModule } from '@angular/forms';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
@NgModule({
  declarations: [
    CreateTaskComponent,
    TaskTableComponent,
    TaskDetailsComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  exports: [
    CreateTaskComponent,
    TaskTableComponent
  ]
})
export class TaskModule { }
