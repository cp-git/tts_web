import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { BenchCandidate } from '../class/bench-candidate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BenchCandidateService {
  benchCandidateUrl: any;

  constructor(private http: HttpClient) {
    this.benchCandidateUrl = `${environment.benchCandidateUrl}`;
  }

  getAllBenchCandidateByCompanyId(
    companyId: number
  ): Observable<BenchCandidate[]> {
    return this.http.get<BenchCandidate[]>(
      `${this.benchCandidateUrl}?companyid=${companyId}`
    );
  }

  getBenchCandidateById(id: number): Observable<BenchCandidate> {
    return this.http.get<BenchCandidate>(`${this.benchCandidateUrl}/${id}`);
  }

  addBenchCandidate(benchCandidate: BenchCandidate): Observable<any> {
    return this.http.post<any>(`${this.benchCandidateUrl}`, benchCandidate);
  }

  deleteByBenchCandidateId(benchCandidateId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.benchCandidateUrl}/${benchCandidateId}`
    );
  }

  updateBenchCandidateByBenchCandidateCode(
    benchCandidateId: number,
    benchCandidate: BenchCandidate
  ): Observable<Object> {
    return this.http.put<any>(
      `${this.benchCandidateUrl}/${benchCandidateId}`,
      benchCandidate
    );
  }
}
