import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/classes/task';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly TASKURL = `http://localhost:8080/ttsms`;

  constructor(private http: HttpClient) { }


  // when there is service for task then please move this code there
  // for getting all parent task using status (create/ inprogress/done)
  getAllParentTaskByStatus(status: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.TASKURL}/allparenttask?status=${status}`);
  }

  // fot getting child task using parent id
  getChildTaskByParentId(parentId : number){
    return this.http.get<Task[]>(`${this.TASKURL}/allchilds/${parentId}`);
  }
}
