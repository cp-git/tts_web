
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../class/employee';
import { EmployeeAndPasswordDTO } from '../../class/employeeandpasswordDTO';
import { EmployeeService } from '../../services/employee.service';
import { Country } from '../../class/country';
import { Company } from '../../class/company';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeId!: number; // Property to store the employee ID
  employeeData: EmployeeAndPasswordDTO = new EmployeeAndPasswordDTO(); // Property to store employee data, initialized with a new instance of 'EmployeeAndPasswordDTO'
  employees: Employee[] = []; // Property to store the list of employees, initialized as an empty array
  countries!: Country[]; // Property to store the list of countries as an array of 'Country' objects
  companies!: Company[]; // Property to store the list of companies as an array of 'Company' objects


  birthDate!: null; // Property to store the birth date, initialized as null


  constructor(private employeeService: EmployeeService, private router: Router) { } // Constructor with parameter to inject 'EmployeeService' dependency

  //This method is called when the component is initialized
  ngOnInit(): void {

    this.fetchCountries(); // Call the method 'fetchCountries()' to fetch the countries
    this.fetchCompanies(); // Call the method 'fetchCompanies()' to fetch the companies
  }

  // Method to get the maximum date for the birth date input field and return it as a string
  getMaxDate(): string {
    const currentDate = new Date(); // Get the current date and time
    const maxDate = currentDate.toISOString().split('T')[0]; // Format the current date as a string in "yyyy-mm-dd" format
    return maxDate; // Return the formatted date as the maximum date for the birth date input field
  }

  // Method to create an employee by calling the employee service's createEmployee method
  createEmployee() {
    this.employeeService.createEmployee(this.employeeData).subscribe( // Call the 'createEmployee' method of 'EmployeeService' to create the employee and subscribe to the response
      (response) => {
        console.log('Employee created successfully:', response); // Log the successful response
        alert('Employee Created Successfully'); // Show an alert indicating successful creation
        // Create a new instance of 'EmployeeAndPasswordDTO' to reset/Clear the form inputs after successful creation
        this.employeeData = new EmployeeAndPasswordDTO();
      },
      (error) => {
        alert('Failed to Create Employee. UserName or Email Already Exist'); // Show an alert indicating failure with a specific message
      }
    );
  }

  // Method to fetch all countries from the server and update the 'countries' property
  fetchCountries() {
    this.employeeService.getAllCountries().subscribe( // Call the 'getAllCountries' method of 'EmployeeService' to fetch the countries and subscribe to the response
      (data) => {
        this.countries = data; // Update the 'countries' property with the fetched list of countries
      },
      (error) => {
        console.error('Error fetching countries:', error); // Log an error message with details of the error
      }
    );
  }

  // Method to fetch all companies from the server and update the 'companies' property
  fetchCompanies() {
    this.employeeService.getAllCompanies().subscribe( // Call the 'getAllCompanies' method of 'EmployeeService' to fetch the companies and subscribe to the response
      (data) => {
        this.companies = data; // Update the 'companies' property with the fetched list of companies
      },
      (error) => {
        console.error('Error fetching companies:', error); // Log an error message with details of the error
      }
    );
  }

  RedirectToEmployee() {
    this.router.navigate(['employee'])
  }
}
