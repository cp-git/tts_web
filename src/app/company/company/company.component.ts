import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { Company } from '../class/company';
import { Country } from '../class/country';
import { Router } from '@angular/router';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {


  companies: Company[] = []; // An array to hold the list of companies fetched from the service
  company!: Company; // Current selected company

  country!: Country; // A single country instance (assumed to be used for specific purposes)
  countries!: Country[]; // An array to hold the list of countries fetched from the service
  countryName: any;
  constructor(private companyService: CompanyService, private route: Router, private dialogueBoxService: DialogueBoxService) {
  }

  ngOnInit(): void {
    this.getAllCompanies(); // Fetch all companies from the service on component initialization
    this.fetchCountries(); // Fetch the list of countries from the service on component initialization
  }

  // Redirect to the 'addCompany' route
  RedirectToAdd() {
    this.route.navigate(['addCompany']);
  }

  // Fetch all companies from the service
  private getAllCompanies() {
    this.companyService.getAllCompanies().subscribe(
      response => {
        this.companies = response; // Assign the retrieved data to the 'companies' array
      },
      error => {
        console.log('No data in table ');
      }
    );
  }



  // Delete a company by its companyCode
  deleteCompany(companyCode: any) {
    this.dialogueBoxService.open('Are you sure you want to delete this Company ? ', 'decision').then((response) => {
      if (response) {
        console.log('User clicked OK');
        // Do something if the user clicked OK
        this.companyService.deleteCompanyByCompanyId(companyCode).subscribe(
          (response) => {
            // Update the 'companies' array by removing the deleted company
            this.companies = this.companies.filter((company) => company.companyCode !== companyCode);
            this.dialogueBoxService.open('Company deleted successfully', 'information');
          },
          (error) => {
            this.dialogueBoxService.open('Error deleting company', 'warning');
          }
        );
      } else {
        console.log('User clicked Cancel');
        // Do something if the user clicked Cancel
      }
    });
  }

  // Fetch the list of countries from the service
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

  // Get the name of a country by its countryId
  getCountryNameById(countryId: number): string {
    const country = this.countries.find((c) => c.countryId === countryId);
    return country ? country.countryName : '';
  }

  // Redirect to the 'update' route and pass the company object as a parameter
  redirectToUpdate(company: Company) {
    this.route.navigate(['/update'], { state: { company } });
  }

}
