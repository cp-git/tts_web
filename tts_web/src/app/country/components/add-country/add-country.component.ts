import { Component } from '@angular/core';
import { Country } from '../../class/country';
import { CountryService } from '../../services/country.service';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent {

  submitButtonDisabled = false;
  countries!: Country[]; // An array to store the list of countries fetched from the API

  country!: Country; // The current country object to be added

  constructor(private location: Location,
    private countryService: CountryService,
    private router: Router,
    private dialogueBoxService: DialogueBoxService) {
    this.country = new Country(); // Initialize an empty country object for adding a new country
  }

  ngOnInit(): void {

  }

  // Function to add a new country
  addCountry(country: Country) {
    // Set the submitButtonDisabled to true
    this.submitButtonDisabled = true;
    this.countryService.addCountry(country).subscribe(
      (data) => {
        console.log('Country added successfully:', data);
        this.dialogueBoxService.open('Country added successfully', 'information').then((response) => {
          if (response) {
            this.location.back(); // Refresh the page
          }
        });

      },
      (error) => {
        console.error('Failed to add Country:', error);
        this.dialogueBoxService.open('Failed to add Country. Already Exists', 'warning');
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

  navigateToCountry() {
    this.router.navigate(['/country']);
  }

}
