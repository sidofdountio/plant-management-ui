import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Species } from "../model/species";
import { Observable, catchError} from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class SpeciesService {

    private readonly URL = environment.URL;

    constructor(private http: HttpClient) { }

    createAuthorizationHeaders(): HttpHeaders {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "http://localhost:8085/api/v1/plant/specie",
            'Access-Control-Allow-Credentials' : 'true',
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
          })
        };
        
        return httpOptions.headers;
      }

    getAllSpecie(): Observable<Species[]> {
        return this.http.get<Species[]>(`${this.URL}/specie`,{headers: this.createAuthorizationHeaders()})
            .pipe(
                tap(console.log),
                catchError(this.handlerError)
            )
    }

    private handlerError(error: HttpErrorResponse): Observable<never> {
        throw new Error(`An error occured - Error code :${error.status}`);
    }
}