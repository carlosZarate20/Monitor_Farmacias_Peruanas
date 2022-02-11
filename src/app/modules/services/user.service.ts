import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  listUser(body: any) {
    const headers = new HttpHeaders();
    // headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(`${environment.apiUrl}/userList`, body, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }
  saveUser(body: any) {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', '*/*');
    return this.http
      .post(`${environment.apiUrl}/saveUser`, body, { headers: headers })
      .pipe(map((res) => res));
  }

  getInfoUser(id: any) {
    const headers = new HttpHeaders();
    // headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(`${environment.apiUrl}/getUserInfo/${id}`, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }
  updateUser(body: any) {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', '*/*');
    return this.http
      .post(`${environment.apiUrl}/updateUser`, body, { headers: headers })
      .pipe(map((res) => res));
  }
}
