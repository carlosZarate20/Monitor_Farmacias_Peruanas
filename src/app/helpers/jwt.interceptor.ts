import { Observable } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('TOKEN');
    console.log('TOKEN', token);
    request = request.clone({
      setHeaders: {
        // 'Access-Control-Allow-Origin': '*',
        Authorization: token ? 'Bearer ' + token : '',
      },
    });
    return next.handle(request);
  }
}
