import { Injectable } from '@angular/core';
import { Jobportal } from '../classes/jobportal';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobportalService {

  private readonly jobPortalURL = `http://localhost:8080/jobportal/ttsms/`
  constructor(
    private http: HttpClient
  ) { }


  getAllJobPortalsByCompanyId(companyId: number): Observable<Jobportal[]> {
    return this.http.get<Jobportal[]>(`${this.jobPortalURL}jobportals/${companyId}`);
  }

  addJobPortal(jobPortal: Jobportal): Observable<Jobportal> {
    return this.http.post<Jobportal>(`${this.jobPortalURL}jobportal`, jobPortal);
  }

  updateJobPortal(portalId: number, jobPortal: Jobportal): Observable<Jobportal> {
    return this.http.put<Jobportal>(`${this.jobPortalURL}jobportal/${portalId}`, jobPortal);
  }

  deleteJobPortal(portalId: number): Observable<void> {
    return this.http.delete<void>(`${this.jobPortalURL}jobportal/${portalId}`);
  }

}
