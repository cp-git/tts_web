import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogueBoxComponent } from './components/dialogue-box/dialogue-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterPipe } from './pipe/filter.pipe';
import { AdvFilterPipe } from './pipe/adv-filter.pipe';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    DialogueBoxComponent,

    FilterPipe,
    AdvFilterPipe
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [
    FilterPipe,
    AdvFilterPipe
  ]
})
export class SharedModule { }
