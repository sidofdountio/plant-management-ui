import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Watering } from '../model/watering';
import { Observable, catchError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WateringService {



  private readonly URL = environment.URL;

  constructor(private http: HttpClient) { }

  // Add other HTTP methods as needed (e.g., put, delete, etc.)
  createAuthorizationHeaders(): HttpHeaders {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "http://localhost:8085",
        'Access-Control-Allow-Credentials': 'true',
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
      })
    };

    return httpOptions.headers;
  }

  getAllWatering(): Observable<Watering[]> {
    return this.http.get<Watering[]>(`${this.URL}/watering`, { headers: this.createAuthorizationHeaders() })
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }


  save(palantToSave: Watering): Observable<Watering> {
    return this.http.post<Watering>(`${this.URL}/watering`, palantToSave, { headers: this.createAuthorizationHeaders() })
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }
  private handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }
}
