import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogueBoxComponent } from './components/dialogue-box/dialogue-box.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    DialogueBoxComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
  ]
})
export class SharedModule { }
