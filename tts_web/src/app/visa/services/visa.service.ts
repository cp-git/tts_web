import { Injectable } from '@angular/core';
import { Visa } from '../class/visa';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VisaService {
  private readonly visaURL = `https://127.0.0.1:8443/visa/ttsms/`;
  constructor(private http: HttpClient) {}

  getAllVisasByCompanyId(companyId: number): Observable<Visa[]> {
    return this.http.get<Visa[]>(`${this.visaURL}visas/${companyId}`);
  }

  addVisa(visa: Visa): Observable<Visa> {
    return this.http.post<Visa>(`${this.visaURL}visa`, visa);
  }

  updateVisa(visaId: number, visa: Visa): Observable<Visa> {
    return this.http.put<Visa>(`${this.visaURL}visa/${visaId}`, visa);
  }

  deleteVisa(visaId: number): Observable<void> {
    return this.http.delete<void>(`${this.visaURL}visa/${visaId}`);
  }
}
