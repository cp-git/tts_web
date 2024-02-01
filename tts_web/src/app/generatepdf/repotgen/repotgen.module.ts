import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReportgenComponent } from '../components/reportgen/reportgen.component';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FooterModule } from 'src/app/footer/footer.module';



@NgModule({
  declarations: [ReportgenComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule,
    FooterModule

  ],
  exports: [
    ReportgenComponent
  ],
  providers: [DatePipe],
})
export class RepotgenModule { }
