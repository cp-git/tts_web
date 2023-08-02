import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(username: string, password: string): boolean {
    if (username == 'admin' && password == 'admin') {
      return true;
    } else {
      return false;
    }
  }
}
