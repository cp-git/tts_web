import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/classes/employee';
import { Task } from 'src/app/classes/task';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly TaskURL = `http://localhost:8080/ttsms`;
  private readonly EmployeeURL = `http://localhost:8090/employee/ttsms`;
  
  constructor(private http: HttpClient) { }


  // when there is service for task then please move this code there
  // for getting all parent task using status (create/ inprogress/done)
  getAllParentTaskByStatus(status: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.TaskURL}/allparenttask?status=${status}`);
  }

  // for getting child task using parent id
  getChildTaskByParentId(parentId : number){
    return this.http.get<Task[]>(`${this.TaskURL}/allchilds/${parentId}`);
  }

  // for getting all employees
  getAllEmployees() : Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.EmployeeURL}/allemployee`);
  }
}
