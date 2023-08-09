import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { FormsModule } from '@angular/forms';
import { TaskTableComponent } from './components/task-table/task-table.component';


@NgModule({
  declarations: [
    CreateTaskComponent,
    TaskTableComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule
  ],
  exports:[
    CreateTaskComponent,
    TaskTableComponent
  ]
})
export class TaskModule { }
