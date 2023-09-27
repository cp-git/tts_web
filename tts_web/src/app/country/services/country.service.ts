import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { Country } from '../class/country';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {



  countryUrl: any;

  constructor(private http: HttpClient) {

    this.countryUrl = `${environment.countryUrl}`
  }



  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.countryUrl}/allcountry`);
  }


  addCountry(country: Country): Observable<any> {
    return this.http.post<any>(`${this.countryUrl}`, country);
  }


  deleteCountryByCountryCode(countryCode: any): Observable<any> {
    return this.http.delete<any>(this.countryUrl + '/' + countryCode);
  }

  updateCountryByCountryCode(countryCode: number, country: Country): Observable<Object> {
    return this.http.put<any>(`${this.countryUrl}/` + countryCode, country);
  }

}
