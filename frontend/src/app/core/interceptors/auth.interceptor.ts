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

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = '';
    if(localStorage.getItem('token'))
      token = localStorage.getItem('token');
    else if(sessionStorage.getItem('token'))
      token = sessionStorage.getItem('token');
    
    if (token) {
      const cloned = request.clone({
        headers: request.headers.set("Authorization", token)
      });
      return next.handle(cloned);
    }

    return next.handle(request);
  }
  
}
