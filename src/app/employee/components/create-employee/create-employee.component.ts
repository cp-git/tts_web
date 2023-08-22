
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../class/employee';
import { EmployeeAndPasswordDTO } from '../../class/employeeandpasswordDTO';
import { EmployeeService } from '../../services/employee.service';
import { Country } from '../../class/country';
import { Company } from '../../class/company';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Router } from '@angular/router';
import { EmployeePasswordAndEmployeePhotosDTO } from '../../class/employee-password-and-employee-photos-dto';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employee!: Employee; // The current employee object to be added
  employeeId!: any; // Property to store the employee ID
  employeeData: EmployeeAndPasswordDTO = new EmployeeAndPasswordDTO(); // Property to store employee data, initialized with a new instance of 'EmployeeAndPasswordDTO'
  employees: Employee[] = []; // Property to store the list of employees, initialized as an empty array
  countries!: Country[]; // Property to store the list of countries as an array of 'Country' objects
  companies!: Company[]; // Property to store the list of companies as an array of 'Company' objects
  selectedCountryId!: number;
  selectedCompanyId!: number;
  employeePhotosData: EmployeePasswordAndEmployeePhotosDTO = new EmployeePasswordAndEmployeePhotosDTO();
  selectedFile: File | undefined;  // To store the selected file
  constructor(
    private employeeService: EmployeeService,
    private dialogueBoxService: DialogueBoxService,
    private router: Router) {

    this.employeeId = sessionStorage.getItem("employeeId");
  } // Constructor with parameter to inject 'EmployeeService' dependency

  //This method is called when the component is initialized
  ngOnInit(): void {
    if (this.employeeId > 0) {
      console.log("inside");

      this.fetchCountries(); // Call the method 'fetchCountries()' to fetch the countries
      this.fetchCompanies(); // Call the method 'fetchCompanies()' to fetch the companies
    } else {
      console.log("else");

      this.router.navigate([''])
    }

  }

  // Method to get the maximum date for the birth date input field and return it as a string
  getMaxDate(): string {
    const currentDate = new Date(); // Get the current date and time
    const maxDate = currentDate.toISOString().split('T')[0]; // Format the current date as a string in "yyyy-mm-dd" format
    return maxDate; // Return the formatted date as the maximum date for the birth date input field
  }


  // This function creates a new employee and uploads an optional file.
  createEmployee(employee: Employee) {
    // Check if a file is selected for upload
    if (this.selectedFile) {
      // Create a FormData object to prepare the data for HTTP POST request
      const formData = new FormData();

      // Append the selected file to the FormData object
      formData.append('file', this.selectedFile);

      // Create a Blob containing the employee data in JSON format
      const employeeBlob = new Blob([JSON.stringify(employee)], { type: 'application/json' });

      // Append the employee data Blob to the FormData object
      formData.append('employee', employeeBlob);

      // Call the employeeService to create a new employee with the provided data
      this.employeeService.createEmployees(formData).subscribe(
        (response) => {
          // Log a success message and display an information alert indicating that the employee was created successfully
          console.log('Employee created successfully:', response);
          this.dialogueBoxService.open('Employee Created Successfully', 'information');

          // Reset the form data for employee creation (if needed)
          this.employeeData = new EmployeeAndPasswordDTO();
        },
        (error) => {
          // Display a warning alert indicating that there was an error creating the employee, possibly due to a duplicate username or email
          this.dialogueBoxService.open('Failed to Create Employee. UserName or Email Already Exist', 'warning');
        }
      );
    }
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

  // Inside your component class
  getFilteredCompanies(): Company[] {
    if (!this.selectedCountryId) {
      // If no country is selected, return all companies
      return this.companies;
    } else {
      // Filter companies based on selected countryId
      return this.companies.filter(company => company.companyCountryId === this.selectedCountryId);
    }
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
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

}
