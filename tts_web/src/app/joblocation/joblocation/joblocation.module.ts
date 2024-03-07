import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from 'src/app/footer/footer.module';
import { FormsModule } from '@angular/forms';
import { JoblocationComponent } from '../components/joblocation/joblocation.component';
import { AddjoblocationComponent } from '../components/addjoblocation/addjoblocation.component';
import { UpdatejoblocationComponent } from '../components/updatejoblocation/updatejoblocation.component';



@NgModule({
  declarations: [
    JoblocationComponent,
    AddjoblocationComponent,
    UpdatejoblocationComponent
  ],
  imports: [
    CommonModule,
    FooterModule,
    FormsModule,
  ],
  exports: [
    JoblocationComponent,
    AddjoblocationComponent,
    UpdatejoblocationComponent
  ]

})
export class JoblocationModule { }
