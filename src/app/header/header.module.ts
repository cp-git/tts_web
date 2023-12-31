import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
