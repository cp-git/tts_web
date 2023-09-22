import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthLogin } from '../../class/auth-login';
import { AuthKey } from '../../class/auth-key';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  
  private readonly AUTH_URL : string = 'https://localhost:8443/authlogin/auth';

  constructor(
    private http:HttpClient
    ) { }

  public getServerPublicKey() : Observable<any>{
   return this.http.get<any>(`${this.AUTH_URL}/serverpublickey`);
  }

  public getServerRandomString(keyId:number) : Observable<any>{
   return this.http.get<any>(`${this.AUTH_URL}/serverrandomstr/${keyId}`);
  }

  public addClientRandomString(authKey : AuthKey) :Observable<any>{
    return this.http.post<any>(`${this.AUTH_URL}/clientrandomstr`, authKey);
  }

  public addClientPreSecretKey(authKey : AuthKey) :Observable<any>{
    return this.http.post<any>(`${this.AUTH_URL}/clientpresecretstr`, authKey);
  }

  public getTokenBeforeLogin(keyId:number):Observable<any>{
    return this.http.post<any>(`${this.AUTH_URL}/token/${keyId}`,{});
  }

  public login(authUser: AuthLogin, keyId:number) :Observable<any>{
    return this.http.post<any>(`${this.AUTH_URL}/authenticate?keyid=${keyId}`, authUser);
  }

  public getData(keyId:number){
    return this.http.post<any>(`https://localhost:8443/authlogin/hello?keyid=${keyId}`,{"id":10});
  }
  public addInitVector(authKey:AuthKey){
    return this.http.post<any>(`${this.AUTH_URL}/initvector`, authKey);
  }
}
