import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../class/task';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Task2 } from 'src/app/classes/task2';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly TaskURL = environment.taskUrl;

  constructor(private http: HttpClient) { }

  // getTasksByStatusAndCreatorAndAssigneeOfCompanyByCompanyIdId(parentId: any, status: any, createdBy: any, assignedTo: any, companyId: any): Observable<Task[]> {
  //   return this.http.get<Task[]>(`${this.TaskURL}/allparent?parentid=${parentId}&status=${status}&createdby=${createdBy}&assignedto=${assignedTo}&companyid=${companyId}`,);
  // }

  // Update the method to accept an array of selected statuses
  getTasksByStatusAndCreatorAndAssigneeOfCompanyByCompanyIdId(
    parentId: any,
    statuses: string[], // Accept an array of selected statuses
    createdBy: any,
    assignedTo: any,
    companyId: any
  ): Observable<Task[]> {
    // Create an HttpParams object to handle query parameters
    let params = new HttpParams();
    params = params.append('parentid', parentId);

    // Append each selected status to the query parameter
    for (const status of statuses) {
      params = params.append('status', status);
    }

    params = params.append('createdby', createdBy);
    params = params.append('assignedto', assignedTo);
    params = params.append('companyid', companyId);

    // Use the HttpParams in the request
    return this.http.get<Task[]>(`${this.TaskURL}/allparent`, { params });
  }

  // for getting child task using parent id
  getChildTaskByParentId(parentId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.TaskURL}/allchilds/${parentId}`);
  }

  createOrUpdateTaskAndAddReason(formData: FormData): Observable<Task> {
    return this.http.post<Task>(`${this.TaskURL}/savetask`, formData);
  }

  getTaskByTaskId(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.TaskURL}/task/${taskId}`);

  }

  // This method fetches the list of files of a specific type from the server
  getFilesByTaskId(taskId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.TaskURL}/task/getfiles?taskid=${taskId}`);
  }

  downloadFileByTaskIdAndFileName(taskId: number, fileName: string): Observable<Blob> {
    return this.http.get(`${this.TaskURL}/download/${taskId}?filename=${fileName}`, { responseType: 'blob' });
  }

  getTaskCreatedByMeOrAssignedToMe(employeeId: number) {
    return this.http.get<Task2>(`${this.TaskURL}/created/${employeeId}`);
  }
}
