
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../class/employee';
import { EmployeeAndPasswordDTO } from '../../class/employeeandpasswordDTO';
import { EmployeeService } from '../../services/employee.service';
import { Country } from '../../class/country';
import { Company } from '../../class/company';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
import { Router } from '@angular/router';
import { EmployeePasswordAndEmployeePhotosDTO } from '../../class/employee-password-and-employee-photos-dto';
import { Location } from '@angular/common'
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
  empDataFromSession: any;
  empData: any;
  companyId: any;
  countryId: any;
  isAdmin: boolean = false;
  country: Country = new Country();
  company: Company = new Company();

  selectedImageUrl: string | null = null;
  selectedFile: File | undefined;  // To store the selected file
  constructor(
    private employeeService: EmployeeService,
    private dialogueBoxService: DialogueBoxService,
    private router: Router, private location: Location) {
    this.empDataFromSession = sessionStorage.getItem('empData')
    this.empData = JSON.parse(this.empDataFromSession);
    // Retrieve 'employeeId' from session storage
    this.employeeId = sessionStorage.getItem("employeeId");

    // Set 'companyId' and 'countryId' properties based on 'empData'
    this.companyId = this.empData.companyId;
    this.countryId = this.empData.countryId;

  } // Constructor with parameter to inject 'EmployeeService' dependency

  //This method is called when the component is initialized
  ngOnInit(): void {
    this.isAdmin = this.empData.admin;

    if (this.isAdmin) {
      // If the user is an admin, perform these actions
      this.getCountryByCountryId(); // Fetch country data by 'countryId'
      this.getCompanyByCompanyId(); // Fetch company data by 'companyId'
    } else {
      // If the user is not an admin, perform these actions
      this.fetchCountries(); // Call the method 'fetchCountries()' to fetch the countries
      this.fetchCompanies(); // Call the method 'fetchCompanies()' to fetch the companies
    }
    // if (this.employeeId > 0) {
    //   console.log("inside");

    //   this.fetchCountries(); // Call the method 'fetchCountries()' to fetch the countries
    //   this.fetchCompanies(); // Call the method 'fetchCompanies()' to fetch the companies
    // } else {
    //   console.log("else");

    //   this.router.navigate([''])
    // }

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
    // alert(JSON.stringify(employee));
    if (this.isAdmin) {
      employee.companyId = this.companyId
      employee.countryId = this.countryId
    }

    // Check if a file is selected for upload
    if (this.selectedFile) {
      // Create a FormData object to prepare the data for HTTP POST request
      const formData = new FormData();

      // Append the selected file to the FormData object
      formData.append('file', this.selectedFile);
      console.log(employee);

      // Create a Blob containing the employee data in JSON format
      const employeeBlob = new Blob([JSON.stringify(employee)], { type: 'application/json' });
      console.log(employeeBlob);
      // Append the employee data Blob to the FormData object
      formData.append('employee', employeeBlob);
      console.log(formData.get('employee'));

      // Call the employeeService to create a new employee with the provided data
      this.employeeService.createEmployees(formData).subscribe(
        (response) => {
          //alert(JSON.stringify(response));
          console.log(JSON.stringify(response))
          // Log a success message and display an information alert indicating that the employee was created successfully
          console.log('Employee created successfully:', response);
          this.dialogueBoxService.open('Employee Created Successfully', 'information').then((response) => {
            if (response) {
              this.location.back(); // Refresh the page
            }
          });

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
