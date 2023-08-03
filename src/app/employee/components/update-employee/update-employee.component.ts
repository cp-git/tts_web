import { Employee } from '../../class/employee';
import { EmployeeAndPasswordDTO } from '../../class/employeeandpasswordDTO';
import { EmployeeService } from '../../services/employee.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../class/company';
import { Country } from '../../class/country';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {
  employee: Employee; // Declaration of the 'employee' property to hold Employee data
  employeeId!: number; // Declaration of the 'employeeId' property to hold the employee's ID
  employeeData: EmployeeAndPasswordDTO = new EmployeeAndPasswordDTO(); // Declaration of the 'employeeData' property to hold the Employee and Password data
  employees: Employee[] = []; // Declaration of the 'employees' array to hold a list of Employee objects
  countries!: Country[]; // Declaration of the 'countries' array to hold a list of Country objects
  companies!: Company[]; // Declaration of the 'companies' array to hold a list of Company objects
 
  constructor(
    private employeeService: EmployeeService, // Injecting the EmployeeService dependency
    private location: Location, // Injecting the Location dependency to interact with the browser's history
    private route: ActivatedRoute // Injecting the ActivatedRoute dependency to access route parameters
  ) {
    this.employee = new Employee(); // Initializing the 'employee' property with a new Employee object
  }

  ngOnInit(): void {
    this.employee = history.state.employee; // Retrieve the 'employee' data from the browser's history state
    this.fetchCountries(); // Call the method to fetch the list of countries
    this.fetchCompanies(); // Call the method to fetch the list of companies
  }

 // Method to get the maximum date for the birth date input field and return it as a string
 getMaxDate(): string {
  const currentDate = new Date(); // Get the current date and time
  const maxDate = currentDate.toISOString().split('T')[0]; // Format the current date as a string in "yyyy-mm-dd" format
  return maxDate; // Return the formatted date as the maximum date for the birth date input field
}

  // Method to update an employee and their password
  updateEmployeeAndPassword() {
    this.employeeService.updateEmployeeAndPasswordById(this.employeeId, this.employeeData).subscribe(
      (response) => {
        console.log('Employee and password updated successfully:', response); // Log success message and response
        alert('Employee updated successfully'); // Display an alert indicating successful employee update
      },
      (error) => {
        console.error('Failed to update employee and password:', error); // Log error message and response
        alert('Employee updation Failed'); // Display an alert indicating failed employee update
      }
    );
  }

  // Method to update an existing employee
  updateEmployeeByEmployeeId() {
    // Call the service method to update the employee
    this.employeeService.updateEmployeeByEmployeeId(this.employee).subscribe(
      (response) => {
        alert('Employee updated successfully!'); // Display an alert indicating successful employee update
      },
      (error) => {
        alert('Error updating employee due to Email Already Exist'); // Display an alert indicating failed employee update
      }
    );
  }

  // Method to get an employee with their password by ID
  getEmployeeWithPassword() {
    this.employeeService.getEmployeeWithPasswordById(this.employeeId).subscribe(
      (employeeAndPassword) => {
        this.employeeData = employeeAndPassword; // Assign the response to 'employeeData' property
      },
      (error) => {
        console.error('Failed to get employee with password:', error); // Log error message and response
      }
    );
  }

  // Method to get Countries
  fetchCountries() {
    this.employeeService.getAllCountries().subscribe(
      (data) => {
        this.countries = data; // Assign the fetched country data to 'countries' property
        //console.table(this.countries)
      },
      (error) => {
        console.error('Error fetching countries:', error); // Log error message and response
      }
    );
  }

   // Method to get Companies
  fetchCompanies() {
    this.employeeService.getAllCompanies().subscribe(
      (data) => {
        this.companies = data; // Assign the fetched company data to 'companies' property
      },
      (error) => {
        console.error('Error fetching companies:', error); // Log error message and response
      }
    );
  }

  back() {
    this.location.back(); // Go back to the previous location in the browser's history
  }
}