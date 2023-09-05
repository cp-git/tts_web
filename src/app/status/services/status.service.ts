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
        map((statuses: any[]) => statuses.sort((a, b) => a.statusId - b.statusId)) // Sort the statuses by statusId
      );
  }
}
