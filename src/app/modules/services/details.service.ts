import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class DetailsService{
    constructor(private http: HttpClient){
    
    }

    getDetailTransaction(id: any){
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');
        return this.http
        .get(`${environment.apiUrl}/getDetailTransaction/${id}`,{headers: headers})
        .pipe(map(res => res));
    }

}