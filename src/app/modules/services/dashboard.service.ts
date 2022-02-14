import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}
  getTransaction() {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http
      .get(`${environment.apiUrl}/listarTransactionDashboard`, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }
  getCantTransactionMonth() {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http
      .get(`${environment.apiUrl}/getCantTransactionMonth`, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }

  getTransactionsLastSixMonths() {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http
      .get(`${environment.apiUrl}/polarChartTransactions`, { headers: headers })
      .pipe(map((res) => res));
  }
}
