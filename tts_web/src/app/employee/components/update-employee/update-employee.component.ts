import { Employee } from '../../class/employee';
import { EmployeeAndPasswordDTO } from '../../class/employeeandpasswordDTO';
import { EmployeeService } from '../../services/employee.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../../class/company';
import { Country } from '../../class/country';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { environment } from 'src/environments/environment.dev';
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
  selectedFile: File | undefined;  // To store the selected file
  submitButtonDisabled = false;
  empDataFromSession: any;
  empData: any;
  companyId: any;
  countryId: any;
  isAdmin: boolean = false;
  country: Country = new Country();
  company: Company = new Company();

  selectedFileURL: string | undefined;
  employeeURL: any;
  constructor(
    private employeeService: EmployeeService, // Injecting the EmployeeService dependency
    private location: Location, // Injecting the Location dependency to interact with the browser's history
    private route: ActivatedRoute, // Injecting the ActivatedRoute dependency to access route parameters
    private dialogueBoxService: DialogueBoxService,
    private router: Router
  ) {
    this.employee = new Employee(); // Initializing the 'employee' property with a new Employee object
    this.empDataFromSession = sessionStorage.getItem('empData')
    this.empData = JSON.parse(this.empDataFromSession);
    this.employeeURL = environment.employeeUrl + '/employee/photos';
    this.companyId = this.empData.companyId;
    this.countryId = this.empData.countryId;
  }

  ngOnInit(): void {
    console.log(this.employeeURL);
    this.isAdmin = this.empData.admin;

    // if (this.isAdmin) {
    //   this.employee = history.state.employee;
    //   this.getCountryByCountryId();
    //   this.getCompanyByCompanyId();
    // } else {
    this.employee = history.state.employee; // Retrieve the 'employee' data from the browser's history state
    this.fetchCountries(); // Call the method to fetch the list of countries
    this.fetchCompanies(); // Call the method to fetch the list of companies
    //}
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
        this.dialogueBoxService.open('Employee updated successfully', 'information').then((response) => {
          if (response) {
            this.location.back(); // Refresh the page
          }
        });
      },
      (error) => {
        console.error('Failed to update employee and password:', error); // Log error message and response
        this.dialogueBoxService.open('Employee updation Failed', 'warning'); // Display an alert indicating failed employee update
      }
    );
  }

  // This function updates an employee's information, including an optional file upload.
  updateEmployeeByEmployeeId(updatedEmployee: Employee) {
    // Check if a file is selected for upload

    alert(JSON.stringify(updatedEmployee));
    const formData = new FormData();
    if (this.selectedFile) {
      // Log the name of the selected file
      console.log(this.selectedFile.name);

      // Create a FormData object to prepare the data for HTTP POST request

      formData.append('file', this.selectedFile); // Append the selected file to the FormData object
    }
    console.log(updatedEmployee);

    // Create a Blob containing the updatedEmployee data in JSON format
    const employeeBlob = new Blob([JSON.stringify(updatedEmployee)], { type: 'application/json' });

    // Append the employee data Blob to the FormData object
    formData.append('employee', employeeBlob);
    this.submitButtonDisabled = true;
    // Call the employeeService to update the employee with the given employeeId
    this.employeeService.updateEmployeeByEmployeeId(updatedEmployee.employeeId, formData).subscribe(
      (response) => {
        // Display a success alert indicating that the employee was updated successfully
        this.dialogueBoxService.open('Employee updated successfully', 'information').then((response) => {
          if (response) {
            this.location.back(); // Refresh the page
          }
        });
      },
      (error) => {
        // Display a warning alert indicating that there was an error updating the employee, possibly due to a duplicate email
        this.dialogueBoxService.open('Error updating employee due to Email Already Exist', 'warning');
      }
    );

  }


  // Method to get an employee with their password by ID
  getEmployeeWithPassword() {
    this.employeeService.getEmployeeWithPasswordById(this.employeeId).subscribe(
      (employeeAndPassword) => {
        console.log(this.employeeData);
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
  // Method to check if the form is valid
  isFormValid(): boolean {
    return (
      !!this.employeeData.firstName &&
      !!this.employeeData.lastName &&
      !!this.employeeData.countryId &&
      !!this.employeeData.companyId &&
      !!this.employeeData.birthDate &&
      !!this.employeeData.employeeEmail &&
      !!this.employeeData.username &&
      !!this.employeeData.password
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFileURL = e.target.result; // Update the selectedFileURL with the selected file's data URL
      };
      reader.readAsDataURL(this.selectedFile); // Read the selected file as a data URL
    }
  }

  getCompanyByCompanyId() {
    // Subscribe to the observable returned by the employeeService to get the list of companies
    this.employeeService.getCompanyByCompanyId(this.companyId).subscribe(
      (data) => {
        this.company = data;
      },
      (error) => {
        console.error('Error fetching companies:', error); // Handle any errors that occur during the request
      }
    );
  }

  getCountryByCountryId() {
    this.employeeService.getCountryByCountryId(this.countryId).subscribe(
      (data) => {
        this.country = data;
      },
      (error) => {
        console.error('Error :', error); // Handle any errors that occur during the request
      }
    );
  }

}
