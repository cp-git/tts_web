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

  constructor(private location: Location, private companyService: CompanyService, private dialogueBoxService: DialogueBoxService, private route: Router) {
    this.company = new Company(); // Initialize an empty Company object for adding a new company
  }

  ngOnInit(): void {
    this.fetchCountries(); // Fetch the list of countries when the component is initialized
  }

  // Function to add a new company
  addCompany(company: Company) {

    if (this.selectedFile) {
      console.log(this.selectedFile.name);

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('company', JSON.stringify(company));

      // alert(JSON.stringify(company)); // Show the company object as an alert (for debugging)
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
          this.dialogueBoxService.open('Failed to add.Company already exists', 'warning');
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

}
