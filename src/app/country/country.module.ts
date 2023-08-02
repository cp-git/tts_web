import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './components/country/country.component';
import { AddCountryComponent } from './components/add-country/add-country.component';



@NgModule({
  declarations: [
    CountryComponent,
    AddCountryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CountryModule { }
