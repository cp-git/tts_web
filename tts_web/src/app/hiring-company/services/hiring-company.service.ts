import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { HiringCompany } from '../class/hiring-company';
import { Observable } from 'rxjs';
import { ExternalTask } from 'src/app/task/class/external-task';

@Injectable({
  providedIn: 'root',
})
export class HiringCompanyService {
  HiringCompanyUrl: any;

  constructor(private http: HttpClient) {
    this.HiringCompanyUrl = `${environment.hiringCompanyUrl}`;
  }

  getAllHiringCompanyByCompanyId(
    companyId: number
  ): Observable<HiringCompany[]> {
    return this.http.get<HiringCompany[]>(
      `${this.HiringCompanyUrl}/all?companyId=${companyId}`
    );
  }

  getHiringCompanyById(id: number): Observable<HiringCompany> {
    return this.http.get<HiringCompany>(`${this.HiringCompanyUrl}/${id}`);
  }

  addHiringCompany(HiringCompany: HiringCompany): Observable<any> {
    return this.http.post<any>(
      `${this.HiringCompanyUrl}/create`,
      HiringCompany
    );
  }

  deleteByHiringCompanyId(hiringCompanyId: number): Observable<any> {
    return this.http.delete<any>(`${this.HiringCompanyUrl}/${hiringCompanyId}`);
  }

  updateHiringCompanyByHiringCompanyCode(
    hiringCompanyId: number,
    HiringCompany: HiringCompany
  ): Observable<Object> {
    return this.http.put<any>(
      `${this.HiringCompanyUrl}/${hiringCompanyId}`,
      HiringCompany
    );
  }
  getExternalTasksByHiringCompanyId(hiringCompanyId: number): Observable<ExternalTask> {
    return this.http.get<ExternalTask>(`${this.HiringCompanyUrl}/internalTask/${hiringCompanyId}`);

  }
}
