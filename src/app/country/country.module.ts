import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './components/country/country.component';
import { AddCountryComponent } from './components/add-country/add-country.component';
import { FormsModule } from '@angular/forms';
import { UpdateCountryComponent } from './components/update-country/update-country.component';



@NgModule({
  declarations: [
    CountryComponent,
    AddCountryComponent,
    UpdateCountryComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CountryModule { }
