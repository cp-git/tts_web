import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../class/status';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private readonly StatusURL = `http://localhost:8090/status/ttsms`;

  constructor(private http: HttpClient) { }

  // for getting all status

  getAllStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.StatusURL}/allstatus`)
      .pipe(
        map((statuses: any[]) => statuses.sort((a, b) => a.statusOrder - b.statusOrder)) // Sort the statuses by statusOrder
      );
  }

  // Get status by ID
  getStatusById(statusId: number): Observable<Status> {
    return this.http.get<Status>(`${this.StatusURL}/status/${statusId}`);
  }

  // Create a new status
  createStatus(status: Status): Observable<Status> {
    return this.http.post<Status>(`${this.StatusURL}/status`, status);
  }

  // Update an existing status
  updateStatus(statusId: number, status: Status): Observable<Status> {
    return this.http.put<Status>(`${this.StatusURL}/status/${statusId}`, status);
  }

  // Delete a status by ID
  deleteStatus(statusId: number): Observable<void> {
    return this.http.delete<void>(`${this.StatusURL}/status/${statusId}`);
  }
}
