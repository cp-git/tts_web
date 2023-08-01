import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';
import { Observable } from 'rxjs';
import { Company } from '../class/company';
import { Country } from '../class/country';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  companyUrl: any;
  countryUrl: any;

  constructor(private http: HttpClient) {

    this.companyUrl = `${environment.companyUrL}`
    this.countryUrl = `http://localhost:8090/country/ttsms/country`
  }

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.companyUrl}/all`);
  }

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.countryUrl}/allcountry`);
  }


  addCompany(company: Company): Observable<any> {
    return this.http.post<any>(`${this.companyUrl}`, company);
  }


  deleteCompanyByCompanyId(companyCode: any): Observable<any> {
    return this.http.delete<any>(this.companyUrl + '/' + companyCode);
  }

  updateCompanyByCompanyCode(companyCode: string, company: Company): Observable<Object> {
    return this.http.put<any>(`${this.companyUrl}/` + companyCode, company);
  }
}
