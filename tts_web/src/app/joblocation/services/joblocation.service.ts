import { Injectable } from '@angular/core';
import { Joblocation } from '../classes/joblocation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JoblocationService {

  private readonly jobLocationURL = `https://127.0.0.1:8443/joblocation/ttsms/`
  constructor(
    private http: HttpClient
  ) { }


  getAllJobLocationByCompanyId(companyId: number): Observable<Joblocation[]> {
    return this.http.get<Joblocation[]>(`${this.jobLocationURL}locations/${companyId}`);
  }

  addJobLocation(jobLocation: Joblocation): Observable<Joblocation> {
    return this.http.post<Joblocation>(`${this.jobLocationURL}joblocation`, jobLocation);
  }

  updateJobLocation(locationId: number, jobLocation: Joblocation): Observable<Joblocation> {
    return this.http.put<Joblocation>(`${this.jobLocationURL}joblocation/${locationId}`, jobLocation);
  }

  deleteJobLocation(locationId: number): Observable<void> {
    return this.http.delete<void>(`${this.jobLocationURL}joblocation/${locationId}`);
  }

}
