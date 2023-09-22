import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  token: any;
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authorizationMap: Record<string, string> = {
      '/authlogin/auth': '',
      '/authlogin/auth/authenticate': `Bearer ${sessionStorage.getItem('TOKEN')}`
    };

    const url = request.url;
    let authorizationToken: any;
 
    
    if (url.includes('/authlogin/auth/authenticate')) {
      console.log("1x",url);
      console.log(authorizationMap['/authlogin/auth/authenticate']);
      
      authorizationToken = authorizationMap['/authlogin/auth/authenticate'];

    } else if (url.includes('/authlogin/auth')) {
      console.log("2x",url);
      authorizationToken = authorizationMap['/authlogin/auth'];

    } else {
      console.log("3x",url);
      console.log( authorizationMap['/authlogin/auth/authenticate']);
      
      authorizationToken = authorizationMap['/authlogin/auth/authenticate'];
    }


    request = request.clone({
      setHeaders: {
        'Authorization': `${authorizationToken}`
      },
    });



    return next.handle(request);
  }
}
