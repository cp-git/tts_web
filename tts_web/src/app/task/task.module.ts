import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { FormsModule } from '@angular/forms';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { TaskViewComponent } from './task-view/task-view.component';
import { MatIconModule } from '@angular/material/icon';
import { ViewChildDataComponent } from './components/view-child-data/view-child-data.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
@NgModule({
  declarations: [
    CreateTaskComponent,
    TaskTableComponent,
    TaskViewComponent,
    ViewChildDataComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    MatSidenavModule

  ],
  exports: [
    CreateTaskComponent,
    TaskTableComponent,
    TaskViewComponent
  ]
})
export class TaskModule { }
