import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthLogin } from '../../class/auth-login';
import { AuthKey } from '../../class/auth-key';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {


  private readonly AUTH_URL: string = 'https://localhost:8443/authlogin/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getServerPublicKey(): Observable<any> {
    return this.http.get<any>(`${this.AUTH_URL}/serverpublickey`);
  }

  public getServerRandomString(keyId: number): Observable<any> {
    return this.http.get<any>(`${this.AUTH_URL}/serverrandomstr/${keyId}`);
  }

  public addClientRandomString(authKey: AuthKey): Observable<any> {
    return this.http.post<any>(`${this.AUTH_URL}/clientrandomstr`, authKey);
  }

  public addClientPreSecretKey(authKey: AuthKey): Observable<any> {
    return this.http.post<any>(`${this.AUTH_URL}/clientpresecretstr`, authKey);
  }

  public getTokenBeforeLogin(keyId: number): Observable<any> {
    return this.http.post<any>(`${this.AUTH_URL}/token/${keyId}`, {});
  }

  public login(authUser: AuthLogin, keyId: number): Observable<any> {
    return this.http.post<any>(`${this.AUTH_URL}/authenticate?keyid=${keyId}`, authUser);
  }

  public getData(keyId: number) {
    return this.http.post<any>(`https://localhost:8443/authlogin/hello?keyid=${keyId}`, { "id": 10 });
  }
  public addInitVector(authKey: AuthKey) {
    return this.http.post<any>(`${this.AUTH_URL}/initvector`, authKey);
  }

  isUserLoggedIn(): boolean {
    return sessionStorage.getItem('TOKEN') !== null;
  }

  logout() {
    sessionStorage.removeItem('TOKEN');
    // Clear session storage data
    sessionStorage.removeItem('employeeId');
    sessionStorage.removeItem('companyId');
    sessionStorage.removeItem('empData');
    sessionStorage.removeItem('SERVER_RANDOM_STR');
    sessionStorage.removeItem('INITVECTOR');
    sessionStorage.removeItem('CLIENT_PRESECRET_KEY');
    sessionStorage.removeItem('CLIENT_RANDOM_STR');
    sessionStorage.removeItem('SERVER_PUBLIC_KEY');

    // Navigate to the '/' route
    this.router.navigate(['/']);
  }
}
