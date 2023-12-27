import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { FormsModule } from '@angular/forms';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { CreateChildTaskComponent } from './components/create-child-task/create-child-task.component';
@NgModule({
  declarations: [
    CreateTaskComponent,
    TaskTableComponent,
    CreateChildTaskComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    SharedModule,

  ],
  exports: [
    CreateTaskComponent,
    TaskTableComponent,
    CreateChildTaskComponent
  ]
})
export class TaskModule { }
