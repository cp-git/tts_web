import { Component } from '@angular/core';
import { Country } from '../../class/country';
import { CountryService } from '../../services/country.service';
import { Router } from '@angular/router';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
@Component({
  selector: 'app-update-country',
  templateUrl: './update-country.component.html',
  styleUrls: ['./update-country.component.css']
})
export class UpdateCountryComponent {


  // Define the country class and initialize the countries array.
  country: Country;
  countries!: Country[];

  constructor(private router: Router, private countrySerice: CountryService, private dialogueBoxService: DialogueBoxService) {
    this.country = new Country(); // Initialize an empty country object.
  }

  ngOnInit() {
    // Access the country object passed from the list component through history state.
    this.country = history.state.country; // Get the country object passed from the previous component.

  }

  // Function to update the country details.
  updateCountry(updatedCountry: Country) {
    //  alert(JSON.stringify(updatedCountry));
    // Call the service to update the country data based on the country code.
    this.countrySerice.updateCountryByCountryCode(updatedCountry.countryCode, updatedCountry).subscribe(
      response => {
        this.dialogueBoxService.open('country updated successfully', 'information');
      },
      error => {
        this.dialogueBoxService.open('country updation failed', 'warning');
      }
    );
  }

  // Method to check if the form is valid
  isFormValid(): boolean {
    return (
      !!this.country.countryName &&
      !!this.country.countryCode

    );
  }
}
