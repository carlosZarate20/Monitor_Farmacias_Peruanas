import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class DataMaestraService{

    constructor(private http: HttpClient){
    
    }

    getDataMaestra(){
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        return this.http
        .get(`${environment.apiUrl}/listaDataMaestra`,{headers: headers})
        .pipe(map(res => res));
    }

    sendMasterProvider(typeOp: any){
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZXJ2aWNpb3N3ZWIiLCJwcm9maWxlIjp7ImlkIjoxLCJuYW1lIjoiU1VQRVJWSVNPUiIsInN0YXRlIjoiQUNUSVZFIiwidHlwZSI6IldFQiJ9LCJpYXQiOjE2NDI3OTM5MzcsImV4cCI6MTY0MzY1NzkzN30.YkbNbgT0V1yJjmKE453OBFmlHVnuCFLlzm_zmQaahc4';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        
        return this.http
        .post(`${environment.apiUrl}/enviar/${typeOp}`,{}, {'headers' : headers})
        .pipe(map(res => res));
    }

    sendMasterProccess(masterProccessId: any, time: any){
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZXJ2aWNpb3N3ZWIiLCJwcm9maWxlIjp7ImlkIjoxLCJuYW1lIjoiU1VQRVJWSVNPUiIsInN0YXRlIjoiQUNUSVZFIiwidHlwZSI6IldFQiJ9LCJpYXQiOjE2NDI3OTM5MzcsImV4cCI6MTY0MzY1NzkzN30.YkbNbgT0V1yJjmKE453OBFmlHVnuCFLlzm_zmQaahc4';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

        return this.http
        .post(`${environment.apiUrl}/initJobProcess`,{
            cron: time,
            id: masterProccessId,
        }, {'headers' : headers})
        .pipe(map(res => res));
    }

    
}