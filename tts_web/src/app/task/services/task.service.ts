import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../class/task';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Task2 } from 'src/app/classes/task2';
import { Joblocation } from 'src/app/joblocation/classes/joblocation';
import { Jobportal } from 'src/app/jobportal/classes/jobportal';
import { Taxtype } from 'src/app/taxtype/classes/taxtype';
import { Visa } from 'src/app/visa/class/visa';
import { InternalTask } from '../class/internal-task';
import { ExternalTask } from '../class/external-task';
import { InternalTaskDTO } from '../class/internal-task-dto';
import { ExternalTaskDTO } from '../class/external-task-dto';
import { InternalExternalListDTO } from '../class/internal-external-list-dto';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly TaskURL = environment.taskUrl;

  constructor(private http: HttpClient) {}

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
    return this.http.post<Task>(`${this.TaskURL}/addtask`, formData);
  }

  getTaskByTaskId(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.TaskURL}/taskby/${taskId}`);
  }

  // This method fetches the list of files of a specific type from the server
  getFilesByTaskId(taskId: number): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.TaskURL}/task/getfiles?taskid=${taskId}`
    );
  }

  downloadFileByTaskIdAndFileName(
    taskId: number,
    fileName: string
  ): Observable<Blob> {
    return this.http.get(
      `${this.TaskURL}/download/${taskId}?filename=${fileName}`,
      { responseType: 'blob' }
    );
  }

  getTaskCreatedByMeOrAssignedToMe(employeeId: number) {
    return this.http.get<Task2>(`${this.TaskURL}/created/${employeeId}`);
  }

  getAllParentTasksByCompanyId(companyId: number): Observable<Task2> {
    return this.http.get<Task2>(
      `${this.TaskURL}/allparents?companyid=${companyId}`
    );
  }

  private readonly baseUrl = 'https://127.0.0.1:8443';

  // ---------------------------------------------------------------------------
  private readonly jobLocationURL = `${this.baseUrl}/joblocation/ttsms/locations/`;
  private readonly jobPortalURL = `${this.baseUrl}/jobportal/ttsms/jobportals/`;
  private readonly jobTypeURL = `${this.baseUrl}/taxtype/ttsms/taxtypes/`;
  private readonly visaURL = `${this.baseUrl}/visa/ttsms/visas/`;

  getAllJobLocationsByCompanyId(companyId: number): Observable<Joblocation[]> {
    return this.http.get<Joblocation[]>(`${this.jobLocationURL}${companyId}`);
  }

  getAllJobPortalsByCompanyId(companyId: number): Observable<Jobportal[]> {
    return this.http.get<Jobportal[]>(`${this.jobPortalURL}${companyId}`);
  }

  getAllTaxTypesByCompanyId(companyId: number): Observable<Taxtype[]> {
    return this.http.get<Taxtype[]>(`${this.jobTypeURL}${companyId}`);
  }

  getAllVisasByCompanyId(companyId: number): Observable<Visa[]> {
    return this.http.get<Visa[]>(`${this.visaURL}${companyId}`);
  }
  getInternalTasksByCandidateId(candidateId: number): Observable<InternalTask> {
    return this.http.get<InternalTask>(
      `${this.TaskURL}/internalTask/${candidateId}`
    );
  }
  getExternalTasksByHiringCompanyId(
    hiringCompanyId: number
  ): Observable<ExternalTask> {
    return this.http.get<ExternalTask>(
      `${this.TaskURL}/externalTask/${hiringCompanyId}`
    );
  }

  getInternalTasks(candidateId: number): Observable<InternalTaskDTO> {
    return this.http.get<InternalTaskDTO>(
      `${this.TaskURL}/internal/${candidateId}`
    );
  }
  getExternalTasks(hiringCompanyId: number): Observable<ExternalTaskDTO> {
    return this.http.get<ExternalTaskDTO>(
      `${this.TaskURL}/external/${hiringCompanyId}`
    );
  }

  getInternalAndExternalTasksForTodayProgressByCompanyId(
    companyId: number
  ): Observable<InternalExternalListDTO> {
    return this.http.get<InternalExternalListDTO>(
      `${this.TaskURL}/tasklist/${companyId}`
    );
  }
}
