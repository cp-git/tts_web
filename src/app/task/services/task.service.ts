import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../class/task';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly TaskURL = environment.taskUrl;

  constructor(private http: HttpClient) { }

  getTasksByStatusAndCreatorAndAssigneeOfCompanyByCompanyIdId(parentId: any, status: any, createdBy: any, assignedTo: any, companyId: any): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.TaskURL}/allparent?parentid=${parentId}&status=${status}&createdby=${createdBy}&assignedto=${assignedTo}&companyid=${companyId}`,);
  }

  // for getting child task using parent id
  getChildTaskByParentId(parentId: number):Observable<Task[]> {
    return this.http.get<Task[]>(`${this.TaskURL}/allchilds/${parentId}`);
  }

  createOrUpdateTaskAndAddReason(task:Task):Observable<Task>{
    return this.http.post<Task>(`${this.TaskURL}/savetask`, task);
  }
  
  getTaskByTaskId(taskId:number) :Observable<Task>{
    return this.http.get<Task>(`${this.TaskURL}/task/${taskId}`);

  }
}
