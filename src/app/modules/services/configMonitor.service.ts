import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigMonitorService {
  constructor(private http: HttpClient) {}

  getConfig() {
    const headers = new HttpHeaders();
    // headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(`${environment.apiUrl}/configMonitor`, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }
  saveConfig(body: any) {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', '*/*');
    return this.http
      .post(`${environment.apiUrl}/saveConfigMonitor`, body, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }
}
