import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Employee } from '../class/employee';
import { EmployeeAndPasswordDTO } from '../class/employeeandpasswordDTO';
import { Country } from '../class/country';
import { Company } from '../class/company';

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

  // Method to get an employee with password by their employeeId
  getEmployeeWithPasswordById(employeeId: number): Observable<EmployeeAndPasswordDTO> {
    // Send a GET request to the API to retrieve an employee's data (including password) by their employeeId
    return this._http.get<EmployeeAndPasswordDTO>(`${this.employeeUrl}/employee/${employeeId}`);
  }

  // Method to get all employees
  getAllEmployees(): Observable<Employee[]> {
    // Send a GET request to the API to retrieve a list of all employees
    return this._http.get<Employee[]>(`${this.employeeUrl}/allemployees`);
  }

  // Retrieves a list of all employees and their associated password information
  getAllEmployeeAndPasswordData(): Observable<any> {
    return this._http.get<any>(`${this.employeeUrl}/allemployee`);
  }

  // Method to update an existing employee by their employeeId
  updateEmployeeByEmployeeId(employee: Employee): Observable<any> {
    // Send a PUT request to the API to update an existing employee's data by their employeeId
    return this._http.put<any>(`${this.employeeUrl}/employee/update/${employee.employeeId}`, employee);
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
}
