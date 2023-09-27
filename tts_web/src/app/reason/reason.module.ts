import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReasonComponent } from './components/add-reason/add-reason.component';
import { FormsModule } from '@angular/forms';
import { ChangeHistoryComponent } from './components/change-history/change-history.component';


@NgModule({
  declarations: [
    AddReasonComponent,
    ChangeHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ReasonModule { }
