import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Reason } from '../class/reason';

@Injectable({
  providedIn: 'root'
})
export class ReasonService {
  private readonly reasonUrl: string;
  private readonly statusUrl: string;

  constructor(private http: HttpClient) {
    // Initialize the URLs using values from the environment configuration.
    this.reasonUrl = environment.reasonUrl; // Base URL for reasons
    this.statusUrl = environment.statusURL; // Base URL for status
  }

  // Method to create a new reason.
  createReason(reason: Reason): Observable<any> {
    return this.http.post<any>(`${this.reasonUrl}/reason`, reason);
  }

  // Method to get reasons by a specific task ID.
  getReasonsByTaskId(taskId: number): Observable<any> {
    return this.http.get<any>(`${this.reasonUrl}/reason/${taskId}`);
  }

  // Method to get all reasons.
  getAllReasons(): Observable<any> {
    return this.http.get<any>(`${this.reasonUrl}/allreasons`);
  }

  // Method to get all status values.
  getAllStatus(): Observable<any> {
    return this.http.get<any>(`${this.statusUrl}/allstatus`);
  }


}
