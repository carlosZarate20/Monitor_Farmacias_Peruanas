import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map, catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class TransactionLogService{
    constructor(private http: HttpClient){
    
    }
    
    getErrorType(){
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');

        return this.http
        .get(`${environment.apiUrl}/getErrorType`, {headers: headers})
        .pipe(map(res => res));
    }

    getTransactionLogType(){
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');

        return this.http
        .get(`${environment.apiUrl}/getNameTransaction`, {headers: headers})
        .pipe(map(res => res));
    }

    listTransactionLog(transaction : any){
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');

        return this.http
        .post(`${environment.apiUrl}/listarTransactionLog`, transaction, {headers: headers})
        .pipe(map(res => res));
    }
}