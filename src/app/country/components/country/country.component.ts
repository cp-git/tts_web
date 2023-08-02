import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Router } from '@angular/router';
import { Country } from '../../class/country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {


  country!: Country; // A single country instance (assumed to be used for specific purposes)
  countries!: Country[]; // An array to hold the list of countries fetched from the service


  constructor(private countryService: CountryService, private route: Router) {
  }
  ngOnInit(): void {
    this.fetchCountries();
  }


  // Fetch the list of countries from the service
  fetchCountries() {
    this.countryService.getAllCountries().subscribe(
      (data) => {

        this.countries = data; // Store the fetched countries in the 'countries' array
        // alert(this.countries);
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  // Redirect to the 'add country' route
  RedirectToAdd() {
    this.route.navigate(['addCountry']);
  }

  deleteCountry(countryCode: any) {
    this.countryService.deleteCountryByCountryCode(countryCode).subscribe(
      (response) => {
        // Update the 'companies' array by removing the deleted country
        this.countries = this.countries.filter((country) => country.countryCode !== countryCode);
      },
      (error) => {
        console.error('Error deleting country:', error);
      }
    );
  }

  // Redirect to the 'update' route and pass the country object as a parameter
  redirectToUpdate(country: Country) {
    this.route.navigate(['/updateCountry'], { state: { country } });
  }
}
