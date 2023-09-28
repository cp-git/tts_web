import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/classes/employee';
import { environment } from 'src/environments/environment.dev';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  companyUrl: any;
  EmployeeURL: any;

  constructor(private http: HttpClient) {
    this.companyUrl = `${environment.companyUrl}`; // Base URL for company-related API endpoints
    this.EmployeeURL = `${environment.countryUrl}`
  }


  // when there is service for task then please move this code there
  // for getting all parent task using status (create/ inprogress/done)
  // getAllParentTaskByStatus(status: string): Observable<Task[]> {
  //   return this.http.get<Task[]>(`${this.TaskURL}/allparenttask?status=${status}`);
  // }



  // for getting all employees
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.EmployeeURL}/allemployee`);
  }

  // getCompanyById(companyId: number) {
  //   return {
  //     "companyId": 1,
  //     "companyCode": "cpa",
  //     "companyName": "Cloud Point",
  //     "companyContactEmail": "cpa@gmail.com",
  //     "companyContactPhone": "9638527410",
  //     "companyAddress": "add",
  //     "companyZip": "412230",
  //     "companyCountryId": 1,
  //     "companyPhoto":"abc.png"
  //   }

  // }

  getCompanyById(companyId: number): Observable<any> {
    const url = `${this.companyUrl}/${companyId}`;
    return this.http.get(url);
  }
}
