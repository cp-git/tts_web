import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../class/status';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private readonly StatusURL = `http://localhost:8090/status/ttsms`;

  constructor(private http:HttpClient) { }

  // for getting all status
  getAllStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.StatusURL}/allstatus`);
  }
}
