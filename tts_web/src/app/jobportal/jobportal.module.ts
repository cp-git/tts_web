import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobportalComponent } from './components/jobportal/jobportal.component';
import { AddportalComponent } from './components/addportal/addportal.component';
import { UpdateportalComponent } from './components/updateportal/updateportal.component';
import { FooterModule } from '../footer/footer.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    JobportalComponent,
    AddportalComponent,
    UpdateportalComponent
  ],
  imports: [
    CommonModule,
    FooterModule,
    FormsModule,
  ],
  exports: [
    JobportalComponent,
    AddportalComponent
  ]
})
export class JobportalModule { }
