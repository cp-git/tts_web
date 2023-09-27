import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev'; // Assuming you have different environments for development and production
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
    // Initialize the service with API URLs
    this.companyUrl = `${environment.companyUrl}`; // Base URL for company-related API endpoints
    this.countryUrl = `${environment.countryUrl}`; // Base URL for country-related API endpoints
  }

  // Get all companies
  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.companyUrl}/all`);
  }

  // Get all countries
  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.countryUrl}/allcountry`);
  }

  // Add a new company with provided form data
  addCompany(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.companyUrl}`, formData);
  }

  // Delete a company by its company code
  deleteCompanyByCompanyId(companyCode: any): Observable<any> {
    return this.http.delete<any>(`${this.companyUrl}/${companyCode}`);
  }

  // Update a company by its company code with provided form data
  updateCompanyByCompanyCode(companyCode: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.companyUrl}/${companyCode}`, formData);
  }
}
