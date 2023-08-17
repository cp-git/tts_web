import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Password } from '../class/password';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  passwordUrl: any;
  forgotUrl: any;
  constructor(private http: HttpClient) {
    this.passwordUrl = `http://localhost:8090/employee/ttsms/password`
    this.forgotUrl = `http://localhost:8090/ttsms/forgotpass`

  }


  login(username: string, password: string): Observable<boolean> {
    const url = this.passwordUrl + username + '/' + password;
    return this.http.get(url).pipe(
      map((response: any) => {
        alert(JSON.stringify(response) + "servies")
        // Assuming the API returns a boolean value indicating login success
        alert(response.success);
        return response.success == true;
      }),
      catchError(() => {
        // Handle error cases, e.g., API not reachable or invalid response format
        return of(false);
      })
    );
  }


  getPasswordByUsernameAndPassword(username: string, password: string): Observable<Password> {
    return this.http.get<Password>(`${this.passwordUrl}/${username}/${password}`);
  }

  forgotPasswordByUsername(username: string): Observable<any> {
    const requestData = { "username": username };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.forgotUrl, requestData);
  }

}
