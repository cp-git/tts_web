import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/classes/employee';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly EmployeeURL = `http://localhost:8090/employee/ttsms`;

  constructor(private http: HttpClient) { }


  // when there is service for task then please move this code there
  // for getting all parent task using status (create/ inprogress/done)
  // getAllParentTaskByStatus(status: string): Observable<Task[]> {
  //   return this.http.get<Task[]>(`${this.TaskURL}/allparenttask?status=${status}`);
  // }



  // for getting all employees
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.EmployeeURL}/allemployee`);
  }

  getCompanyById(companyId: number) {
    return {
      "companyId": 1,
      "companyCode": "cpa",
      "companyName": "Cloud Point",
      "companyContactEmail": "cpa@gmail.com",
      "companyContactPhone": "9638527410",
      "companyAddress": "add",
      "companyZip": "412230",
      "companyCountryId": 1
    }

  }
}
