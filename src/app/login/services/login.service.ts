import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  passwordUrl: any;
  constructor(private http: HttpClient) {
    this.passwordUrl = `http://localhost:8090/employee/ttsms/password/`
  }

  // login(username: string, password: string): boolean {
  //   if (username == 'admin' && password == 'admin') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  login(username: string, password: string): Observable<boolean> {
    const url = this.passwordUrl + username + '/' + password;
    return this.http.get(url).pipe(
      map((response: any) => {
        // Assuming the API returns a boolean value indicating login success
        return response.success == true;
      }),
      catchError(() => {
        // Handle error cases, e.g., API not reachable or invalid response format
        return of(false);
      })
    );
  }
}
