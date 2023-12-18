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
import { EmployeeFilterComponent } from './components/employee-filter/employee-filter.component';
import { TaskRoutingModule } from '../task/task-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    declarations: [
        DashboardComponent,
        StatusButtonsComponent,
        StatusDropdownComponent,
        EmployeeFilterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        TaskModule,
        FooterModule,
        NgMultiSelectDropDownModule.forRoot(),
        SharedModule,
        CommonModule,
        TaskRoutingModule,
        FormsModule,
        MatExpansionModule,
        BrowserAnimationsModule,
        SharedModule
    ]
})
export class DashboardModule { }
