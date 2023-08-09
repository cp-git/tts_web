
import { Component } from '@angular/core';
import { Employee } from '../../class/employee';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeAndPasswordDTO } from '../../class/employeeandpasswordDTO';
import { Router } from '@angular/router';
import { Country } from '../../class/country';
import { Company } from '../../class/company';
import { JsonpInterceptor } from '@angular/common/http';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],

})
export class EmployeeComponent {
  // Properties to store selected country and company
  country!: Country;
  company!: Company;
  data: any;
  // Property to store the selected employee ID
  employeeId!: number;
  selectedCountryId!: number;
  selectedCompanyId!: number;
  // Property to store data of employee and password (used for updating employee data)
  employeeData: EmployeeAndPasswordDTO = new EmployeeAndPasswordDTO();

  // Property to store the list of employees
  employees: Employee[] = [];

  // Properties to store the list of countries and companies
  countries!: Country[];
  companies!: Company[];


  // Constructor to inject EmployeeService and Router dependencies
  constructor(private employeeService: EmployeeService, private router: Router, private dialogueBoxService: DialogueBoxService) { }

  //This method is called when the component is initialized
  ngOnInit() {
    // Fetch the list of employees initially
    this.getAllEmployeesAndPasswordData();
    // this.getAllEmployees();
    this.fetchCountries();
    this.fetchCompanies();
  }

  // Method to navigate to the CreateEmployeeComponent when the "Add" button is clicked
  navigateToCreateEmployee() {
    this.router.navigate(['/createEmp']);
  }

  // Method to navigate to the UpdateEmployeeComponent when the "Update" button is clicked
  navigateToUpdateEmployee(employee: Employee) {
    this.router.navigate(['/updateEmp'], { state: { employee } });
  }

  // Method to fetch all employees from the server and update the 'employees' property
  getAllEmployees() {
    // Subscribe to the observable returned by the employeeService to get the list of employees
    this.employeeService.getAllEmployees().subscribe(
      (employees) => {
        this.employees = employees; // Update the 'employees' property with fetched data
      },
      (error) => {
        console.error('Failed to get employees:', error); // Handle any errors that occur during the request
      }
    );
  }


  getAllEmployeesAndPasswordData() {
    this.employeeService.getAllEmployeeAndPasswordData().subscribe(
      (data: EmployeeAndPasswordDTO[]) => {
        this.employees = data;
        console.log(this.employees)
      },
      (error) => {
        console.error('Error while fetching employees:', error);
      }
    );
  }
  // Method to fetch all countries from the server and update the 'countries' property
  fetchCountries() {
    // Subscribe to the observable returned by the employeeService to get the list of countries
    this.employeeService.getAllCountries().subscribe(
      (data) => {
        this.countries = data; // Update the 'countries' property with fetched data
      },
      (error) => {
        console.error('Error fetching countries:', error); // Handle any errors that occur during the request
      }
    );
  }

  // Method to fetch all companies from the server and update the 'companies' property
  fetchCompanies() {
    // Subscribe to the observable returned by the employeeService to get the list of companies
    this.employeeService.getAllCompanies().subscribe(
      (data) => {
        this.companies = data; // Update the 'companies' property with fetched data
      },
      (error) => {
        console.error('Error fetching companies:', error); // Handle any errors that occur during the request
      }
    );
  }

  // Method to get the name of a country by its ID
  getCountryNameById(countryId: number): string {
    const country = this.countries.find((c) => c.countryId === countryId); // Find the country with the given ID in the 'countries' array
    return country ? country.countryName : ''; // Return the country name if found, or an empty string if not found
  }

  // Method to get the name of a company by its ID
  getCompanyNameById(companyId: number): string {
    const company = this.companies.find((c) => c.companyId === companyId); // Find the company with the given ID in the 'companies' array
    return company ? company.companyName : ''; // Return the company name if found, or an empty string if not found
  }

  // Method to get an employee with their password by ID (currently not used in the template)
  getEmployeeWithPassword() {
    // Subscribe to the observable returned by the employeeService to get the employee with password
    this.employeeService.getEmployeeWithPasswordById(this.employeeId).subscribe(
      (employeeAndPassword) => {
        this.employeeData = employeeAndPassword; // Update the 'employeeData' property with fetched data
      },
      (error) => {
        console.error('Failed to get employee with password:', error); // Handle any errors that occur during the request
      }
    );
  }

  // Method to delete an employee when the "Delete" button is clicked for a specific employee
  deleteEmployee(employee: Employee) {
    this.dialogueBoxService.open('Are you sure you want to delete this Employee ? ', 'decision').then((response) => {
      if (response) {
        console.log('User clicked OK');
        // Do something if the user clicked OK
        // Subscribe to the observable returned by the employeeService to delete the employee
        this.employeeService.deleteEmployeeByEmployeeId(employee.employeeId).subscribe(
          (response) => {
            console.log('Employee deleted successfully:', response); // Log success message on successful deletion
            this.dialogueBoxService.open('Employee deleted successfully', 'information');
            // After deleting the employee, refresh the employee list to remove the deleted employee from the table
            //this.getAllEmployees();
            this.ngOnInit();
          },
          (error) => {
            console.error('Failed to delete employee:', error); // Handle any errors that occur during the request
            this.dialogueBoxService.open('Failed to delete employee', 'warning');
          }
        );
      } else {
        console.log('User clicked Cancel');
        // Do something if the user clicked Cancel
      }
    });
  }

  RedirectToAdmin() {
    this.router.navigate(['adminDash'])
  }
}
