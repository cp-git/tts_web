import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from 'src/app/footer/footer.module';
import { FormsModule } from '@angular/forms';
import { TaxtypeComponent } from '../components/taxtype/taxtype.component';
import { AddtaxtypeComponent } from '../components/addtaxtype/addtaxtype.component';
import { UpdatetaxtypeComponent } from '../components/updatetaxtype/updatetaxtype.component';



@NgModule({
  declarations: [
    TaxtypeComponent,
    AddtaxtypeComponent,
    UpdatetaxtypeComponent
  ],
  imports: [
    CommonModule,
    FooterModule,
    FormsModule,
  ],
  exports: [
    TaxtypeComponent,
    AddtaxtypeComponent,
    UpdatetaxtypeComponent
  ]
})
export class TaxtypeModule { }
