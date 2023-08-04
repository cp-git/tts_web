import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/classes/employee';
import { Status } from 'src/app/classes/status';
import { Task } from 'src/app/classes/task';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly TaskURL = `http://localhost:8080/ttsms`;
  private readonly EmployeeURL = `http://localhost:8090/employee/ttsms`;
  private readonly StatusURL = `http://localhost:8090/status/ttsms`;

  constructor(private http: HttpClient) { }


  // when there is service for task then please move this code there
  // for getting all parent task using status (create/ inprogress/done)
  getAllParentTaskByStatus(status: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.TaskURL}/allparenttask?status=${status}`);
  }

  // for getting child task using parent id
  getChildTaskByParentId(parentId: number) {
    return this.http.get<Task[]>(`${this.TaskURL}/allchilds/${parentId}`);
  }

  // for getting all employees
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.EmployeeURL}/allemployee`);
  }

  // for getting all status
  getAllStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.StatusURL}/allstatus`);
  }

  getTasksByStatusAndCreatorAndAssigneeOfCompanyByCompanyIdId(parentId:any, status: any, createdBy: any, assignedTo: any, companyId : any): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.TaskURL}/allparent?parentid=${parentId}&status=${status}&createdby=${createdBy}&assignedto=${assignedTo}&companyid=${companyId}` , );
  }
}
