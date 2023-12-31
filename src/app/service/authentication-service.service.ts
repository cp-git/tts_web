import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  private baseUrl = 'http://localhost:8090/employee/ttsms/password'; // Your Spring Boot backend URL
  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.createBasicAuthToken(username, password),
    });
    console.log(headers);
    //  alert(this.baseUrl);
    return this.http.get(`${this.baseUrl}/${username}/${password}`, { headers });
  }
  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }
  setSession(passwordData: any) {

    sessionStorage.setItem('employeeId', passwordData.employeeId);
  }
  clearSession() {
    sessionStorage.removeItem('token');
  }
  isLoggedIn(): boolean {
    return sessionStorage.getItem('token') !== null;
  }
  logout() {
    sessionStorage.removeItem('token');
  }
}
