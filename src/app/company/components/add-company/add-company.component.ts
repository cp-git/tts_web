import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../class/company';
import { Country } from '../../class/country';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {


  countries!: Country[]; // An array to store the list of countries fetched from the API

  company!: Company; // The current company object to be added

  constructor(private companyService: CompanyService, private route: Router) {
    this.company = new Company(); // Initialize an empty Company object for adding a new company
  }

  ngOnInit(): void {
    this.fetchCountries(); // Fetch the list of countries when the component is initialized
  }

  // Function to add a new company
  addCompany(company: Company) {
    // alert(JSON.stringify(company)); // Show the company object as an alert (for debugging)
    this.companyService.addCompany(company).subscribe(
      (data) => {
        // On successful addition, show a success alert
        alert('Company added successfully');
      },
      (error) => {
        // Handle error if the company addition fails or the country already exists
        alert('Failed to add OR Country already exists');
      }
    );
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

  RedirectToCompany() {
    this.route.navigate(['company'])
  }


}
