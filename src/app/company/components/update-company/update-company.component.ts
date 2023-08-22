import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../../class/company';
import { CompanyService } from '../../services/company.service';
import { Country } from '../../class/country';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {

  // Define the Company class and initialize the countries array.
  company: Company;
  countries!: Country[];

  constructor(private location: Location, private router: Router, private companyService: CompanyService, private dialogueBoxService: DialogueBoxService) {
    this.company = new Company(); // Initialize an empty Company object.
  }

  ngOnInit() {
    // Access the company object passed from the list component through history state.
    this.company = history.state.company; // Get the company object passed from the previous component.
    this.fetchCountries(); // Fetch the list of countries from the service.
  }

  // Function to update the company details.
  updateCompany(updatedCompany: Company) {
    // Call the service to update the company data based on the company code.
    this.companyService.updateCompanyByCompanyCode(updatedCompany.companyCode, updatedCompany).subscribe(
      response => {
        this.dialogueBoxService.open('Company updated successfully', 'information').then((response) => {
          if (response) {
            this.location.back(); // Refresh the page
          }
        });
      },
      error => {
        this.dialogueBoxService.open('Company updation failed', 'warning');
      }
    );

  }

  // Function to fetch the list of countries from the service.
  fetchCountries() {
    this.companyService.getAllCountries().subscribe(
      (data) => {
        this.countries = data; // Store the fetched countries in the 'countries' array.
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }
  // Method to check if the form is valid
  isFormValid(): boolean {
    return (
      !!this.company.companyCode &&
      !!this.company.companyName &&
      !!this.company.companyContactEmail &&
      !!this.company.companyContactPhone &&
      !!this.company.companyAddress &&
      !!this.company.companyZip &&
      !!this.company.companyCountryId

    );
  }



}
