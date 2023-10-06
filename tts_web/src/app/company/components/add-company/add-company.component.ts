import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../class/company';
import { Country } from '../../class/country';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  countries!: Country[]; // An array to store the list of countries fetched from the API
  company!: Company; // The current company object to be added
  selectedFile: File | undefined;  // To store the selected file
  submitButtonDisabled = false;
  selectedImageUrl: string | null = null;
  constructor(private companyService: CompanyService, private dialogueBoxService: DialogueBoxService, private route: Router, private location: Location) {
    this.company = new Company(); // Initialize an empty Company object for adding a new company
  }

  ngOnInit(): void {
    this.fetchCountries(); // Fetch the list of countries when the component is initialized
  }


  // This function adds a new company and uploads an optional file.
  addCompany(company: Company) {
    // Check if a file is selected for upload
    if (this.selectedFile) {
      // Log the name of the selected file
      console.log(this.selectedFile.name);

      // Create a FormData object to prepare the data for an HTTP POST request
      const formData = new FormData();

      // Append the selected file to the FormData object
      formData.append('file', this.selectedFile);

      // Create a Blob containing the company data in JSON format
      const companyBlob = new Blob([JSON.stringify(company)], { type: 'application/json' });

      // Append the company data Blob to the FormData object
      formData.append('company', companyBlob);
      // Set the submitButtonDisabled to true
      this.submitButtonDisabled = true;
      // Call the companyService to add a new company with the provided data
      this.companyService.addCompany(formData).subscribe(
        (data) => {
          // On successful addition, show a success alert
          this.dialogueBoxService.open('Company added successfully', 'information').then((response) => {
            if (response) {
              this.location.back(); // Refresh the page
            }
          });
        },
        (error) => {
          // Handle error if the company addition fails or the company already exists
          this.dialogueBoxService.open('Failed to add. Company already exists', 'warning');
        }
      );
    }
  }


  // Function to fetch the list of countries from the API
  fetchCountries() {
    this.companyService.getAllCountries().subscribe(
      (data) => {
        this.countries = data; // Store the fetched countries in the 'countries' array
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }
  // Method to check if the form is valid
  // isFormValid(): boolean {
  //   return (
  //     !!this.company.companyCode &&
  //     !!this.company.companyName &&
  //     !!this.company.companyContactEmail &&
  //     !!this.company.companyContactPhone &&
  //     !!this.company.companyAddress &&
  //     !!this.company.companyZip &&
  //     !!this.company.companyCountryId

  //   );
  // }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.selectedImageUrl = reader.result as string;
      };
    } else {
      this.selectedImageUrl = null;
    }
  }

   limitZipCodeLength(event: any) {
    const input = event.target;
    const maxLength = 10; // desired maximum length

    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength); // Truncate input if it exceeds the limit
    }
  }

  limitPhoneLength(event: any) {
    const input = event.target;
    const maxLength = 20; //  desired maximum length for phone numbers

    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength); // Truncate input if it exceeds the limit
    }
  }
}
