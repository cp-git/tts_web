import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/employee/class/employee';
import { Task } from 'src/app/task/class/task';
import { environment } from 'src/environments/environment.dev';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  companyUrl: any;
  EmployeeURL: any;

  constructor(private http: HttpClient) {
    this.companyUrl = `${environment.companyUrl}`; // Base URL for company-related API endpoints
    this.EmployeeURL = `${environment.employeeUrl}`
  }


  // when there is service for task then please move this code there
  // for getting all parent task using status (create/ inprogress/done)
  // getAllParentTaskByStatus(status: string): Observable<Task[]> {
  //   return this.http.get<Task[]>(`${this.TaskURL}/allparenttask?status=${status}`);
  // }



  // for getting all employees
  getAllEmployees(companyId: any): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.EmployeeURL}/companyemp/${companyId}`);
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


  getTaskCreatedByMeOrAssignedToMe(employeeId: number) {
    return this.http.get<Task[]>(`http://localhost:8080/ttsms/createdby/${employeeId}`);
  }

}
