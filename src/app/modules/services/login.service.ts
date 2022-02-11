import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  signIn(username: string, password: string) {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', '*/*');
    return this.http
      .post(
        `${environment.apiUrl}/signIn`,
        {
          username,
          password,
        },
        { headers: headers }
      )
      .pipe(map((res) => res));
  }
}
