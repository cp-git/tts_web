import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { StatusButtonsComponent } from './components/status-buttons/status-buttons.component';
import { TaskModule } from '../task/task.module';
import { FooterModule } from '../footer/footer.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { StatusDropdownComponent } from './components/status-dropdown/status-dropdown.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        DashboardComponent,
        StatusButtonsComponent,
        StatusDropdownComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        TaskModule,
        FooterModule,
        NgMultiSelectDropDownModule.forRoot(),
        SharedModule
    ]
})
export class DashboardModule { }
