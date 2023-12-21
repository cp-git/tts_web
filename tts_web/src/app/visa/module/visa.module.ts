import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisaComponent } from '../component/visa/visa.component';
import { AddvisaComponent } from '../component/addvisa/addvisa.component';
import { UpdatevisaComponent } from '../component/updatevisa/updatevisa.component';
import { FooterModule } from 'src/app/footer/footer.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [

    VisaComponent,
    AddvisaComponent,
    UpdatevisaComponent,
  ],
  imports: [
    CommonModule,
    FooterModule,
    FormsModule,
  ],
  exports: [
    VisaComponent
  ]
})
export class VisaModule { }
