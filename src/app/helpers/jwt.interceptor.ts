import { Observable } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZXJ2aWNpb3N3ZWIiLCJwcm9maWxlIjp7ImlkIjoxLCJuYW1lIjoiU1VQRVJWSVNPUiIsInN0YXRlIjoiQUNUSVZFIiwidHlwZSI6IldFQiJ9LCJpYXQiOjE2NDI3ODYyOTMsImV4cCI6MTY0MzY1MDI5M30.c__X10A-F2XVm0vYx-3Z-Zj36F-20pgT5yE_dJIiaco';
        request = request.clone({
            setHeaders: { 
                'Access-Control-Allow-Origin': "*",
                Authorization: 'bearer ' + token }
          });
        return next.handle(request);
    }
}