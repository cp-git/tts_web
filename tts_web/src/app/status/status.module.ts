import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './components/status/status.component';
import { FormsModule } from '@angular/forms';

import { AddStatusComponent } from './components/add-status/add-status.component';
import { UpdateStatusComponent } from './components/update-status/update-status.component';
import { AdmindashboardComponent } from '../adminDashboard/admindashboard/admindashboard.component';
import { RouterModule } from '@angular/router';
import { AdminModule } from '../adminDashboard/admin/admin.module';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
import { JobportalModule } from '../jobportal/jobportal.module';
import { VisaModule } from '../visa/module/visa.module';
import { TaxtypeModule } from '../taxtype/taxtype/taxtype.module';
import { Joblocation } from '../joblocation/classes/joblocation';
import { JoblocationModule } from '../joblocation/joblocation/joblocation.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [StatusComponent, AddStatusComponent, UpdateStatusComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AdminModule,
    FooterModule,
    HeaderModule,
    JobportalModule,
    VisaModule,
    TaxtypeModule,
    JoblocationModule,
    MatExpansionModule,
  ],
})
export class StatusModule {}
