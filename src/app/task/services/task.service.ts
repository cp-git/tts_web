import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../class/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly TaskURL = `http://localhost:8090/task/ttsms`;

  constructor(private http: HttpClient) { }

  getTasksByStatusAndCreatorAndAssigneeOfCompanyByCompanyIdId(parentId: any, status: any, createdBy: any, assignedTo: any, companyId: any): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.TaskURL}/allparent?parentid=${parentId}&status=${status}&createdby=${createdBy}&assignedto=${assignedTo}&companyid=${companyId}`,);
  }

  // for getting child task using parent id
  getChildTaskByParentId(parentId: number) {
    return this.http.get<Task[]>(`${this.TaskURL}/allchilds/${parentId}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.TaskURL}/savetask`, task);
  }
}
