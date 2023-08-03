import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../../class/company';
import { CompanyService } from '../../services/company.service';
import { Country } from '../../class/country';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {

  // Define the Company class and initialize the countries array.
  company: Company;
  countries!: Country[];

  constructor(private router: Router, private companyService: CompanyService) {
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
        alert(`Company updated successfully!`);
      },
      error => {
        alert(`Company updation failed!`);
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

}
