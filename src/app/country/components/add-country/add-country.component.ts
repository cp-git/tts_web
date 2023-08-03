import { Component } from '@angular/core';
import { Country } from '../../class/country';
import { CountryService } from '../../services/country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent {


  countries!: Country[]; // An array to store the list of countries fetched from the API

  country!: Country; // The current country object to be added

  constructor(private countryService: CountryService, private router: Router) {
    this.country = new Country(); // Initialize an empty country object for adding a new country
  }

  ngOnInit(): void {

  }

  // Function to add a new country
  addCountry(country: Country) {

    this.countryService.addCountry(country).subscribe(
      (data) => {
        // On successful addition, show a success alert
        alert('Country added successfully');
      },
      (error) => {
        // Handle error if the country addition fails or the country already exists
        alert('Failed to add Country');
      }
    );
  }


  RedirectToCountry() {
    this.router.navigate(['country'])
  }

}
