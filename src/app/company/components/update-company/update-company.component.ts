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
  selectedFile: File | undefined;  // To store the selected file

  constructor(private router: Router, private companyService: CompanyService, private dialogueBoxService: DialogueBoxService, private location: Location) {
    this.company = new Company(); // Initialize an empty Company object.
  }

  ngOnInit() {
    // Access the company object passed from the list component through history state.
    this.company = history.state.company; // Get the company object passed from the previous component.
    this.fetchCountries(); // Fetch the list of countries from the service.
  }


  // This function updates a company's information, including an optional file upload.

  updateCompany(updatedCompany: Company) {
    // Check if a file is selected for upload
    if (this.selectedFile) {
      // Log the name of the selected file
      console.log(this.selectedFile.name);

      // Create a FormData object to prepare the data for HTTP POST request
      const formData = new FormData();

      // Append the selected file to the FormData object
      formData.append('file', this.selectedFile);

      // Create a Blob containing the updatedCompany data in JSON format
      const companyBlob = new Blob([JSON.stringify(updatedCompany)], { type: 'application/json' });

      // Append the company data Blob to the FormData object
      formData.append('company', companyBlob);

      // Call the companyService to update the company with the given companyCode
      this.companyService.updateCompanyByCompanyCode(updatedCompany.companyCode, formData).subscribe(
        (response) => {
          // Display a success alert indicating that the company was updated successfully
          this.dialogueBoxService.open('Company updated successfully', 'information').then((response) => {
            if (response) {
              this.location.back(); // Refresh the page
            }
          });
        },
        (error) => {
          // Display a warning alert indicating that there was an error updating the company
          this.dialogueBoxService.open('Company updation failed', 'warning');
        }
      );
    }
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

}
