import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Employee } from '../class/employee';
import { EmployeeAndPasswordDTO } from '../class/employeeandpasswordDTO';
import { Country } from '../class/country';
import { Company } from '../class/company';
import { Password } from 'src/app/login/class/password';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly employeeUrl: string;
  private countryUrl: any;
  private companyUrl: any;

  // Constructor to initialize the HttpClient and set the employeeUrl, countryUrl, and companyUrl
  constructor(private _http: HttpClient) {
    // Get the employeeUrl, countryUrl, and companyUrl from the environment file
    this.employeeUrl = environment.employeeUrl;
    this.countryUrl = environment.countryUrl;
    this.companyUrl = environment.companyUrl;
  }

  // Method to create a new employee
  createEmployee(employeeAndPasswordDTO: EmployeeAndPasswordDTO): Observable<any> {
    // Send a POST request to the API to create a new employee with the provided data
    return this._http.post<any>(`${this.employeeUrl}/employee`, employeeAndPasswordDTO);
  }

  // This function sends a POST request to the API to create a new employee with the provided data in a FormData object.
  createEmployees(formData: FormData): Observable<any> {
    // Send a POST request to the API endpoint for creating a new employee
    console.log(formData);

    return this._http.post<any>(`${this.employeeUrl}/employee`, formData);
  }



  // Method to get an employee with password by their employeeId
  getEmployeeWithPasswordById(employeeId: number): Observable<EmployeeAndPasswordDTO> {
    // Send a GET request to the API to retrieve an employee's data (including password) by their employeeId
    return this._http.get<EmployeeAndPasswordDTO>(`${this.employeeUrl}/employee/${employeeId}`);
  }

  // Method to get all employees
  getAllEmployees(): Observable<Employee[]> {
    // alert(this.getAllEmployees)
    // Send a GET request to the API to retrieve a list of all employees
    return this._http.get<Employee[]>(`${this.employeeUrl}/allemployees`);
  }

  // Retrieves a list of all employees and their associated password information
  getAllEmployeeAndPasswordData(): Observable<any> {

    return this._http.get<any>(`${this.employeeUrl}/allemployee`);

  }


  // This function sends a PUT request to the API to update an existing employee's data by their employeeId.
  updateEmployeeByEmployeeId(employeeId: number, formData: FormData): Observable<any> {
    // Construct and send a PUT request to the API endpoint for updating an employee
    return this._http.put<any>(`${this.employeeUrl}/employee/update/${employeeId}`, formData);
  }


  // Method to delete an employee by their employeeId
  deleteEmployeeByEmployeeId(employeeId: number): Observable<any> {
    // Send a DELETE request to the API to delete an employee by their employeeId
    return this._http.delete<any>(`${this.employeeUrl}/employee/${employeeId}`);
  }

  // Method to update an existing employee's data and password by their employeeId
  updateEmployeeAndPasswordById(employeeId: number, employeeAndPasswordDTO: EmployeeAndPasswordDTO): Observable<any> {
    // Send a PUT request to the API to update an existing employee's data and password by their employeeId
    return this._http.put<any>(`${this.employeeUrl}/emppass/${employeeId}`, employeeAndPasswordDTO);
  }

  // Method to get all countries
  getAllCountries(): Observable<Country[]> {
    return this._http.get<Country[]>(`${this.countryUrl}/allcountry`);
  }

  // Method to get all companies
  getAllCompanies(): Observable<Company[]> {
    return this._http.get<Company[]>(`${this.companyUrl}/all`);
  }

  getCompanyByCompanyId(companyId: number): Observable<Company> {
    return this._http.get<Company>(`${this.companyUrl}/${companyId}`);
  }

  getAllCompanyEmployeeByCompanyId(): Observable<Employee[]> {
    return this._http.get<Employee[]>(`${this.employeeUrl}`)
  }
  // Method to get all employees by company ID
  getAllEmployeesByCompanyId(companyId: number): Observable<Employee[]> {
    // Send a GET request to the API to retrieve a list of all employees for the given company
    return this._http.get<Employee[]>(`${this.employeeUrl}/companyemp/${companyId}`);
  }

  getCountryByCountryId(countryId: number): Observable<Country> {
    // Send a GET request to the API to retrieve a list of all employees for the given company
    return this._http.get<Country>(`${this.countryUrl}/countryId/${countryId}`);
  }

  getAllEmployeesAndPasswordByCompanyId(companyId: number): Observable<EmployeeAndPasswordDTO[]> {
    // Send a GET request to the API to retrieve a list of all employees for the given company
    return this._http.get<EmployeeAndPasswordDTO[]>(`${this.employeeUrl}/comEmpPwd/${companyId}`);
  }

  getProfileImageByEmployeeId(employeeId: number): Observable<Employee> {
    return this._http.get<Employee>(`${this.employeeUrl}/employee/photos/${employeeId}`)
  }


  updatePasswordByEmployeeId(employeeId: number, password: Password): Observable<Password> {
    // Construct and send a PUT request to the API endpoint for updating an employee
    return this._http.put<Password>(`${this.employeeUrl}/password/${employeeId}`, password);
  }

}
