import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Plant } from '../model/plant';
import { Observable, catchError} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  
  private readonly URL = environment.URL;

  constructor(private http: HttpClient) { }

    // Add other HTTP methods as needed (e.g., put, delete, etc.)
    createAuthorizationHeaders(): HttpHeaders {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "http://localhost:8085",
          'Access-Control-Allow-Credentials' : 'true',
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
        })
      };
      
      return httpOptions.headers;
    }

  getAllPlant(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.URL}`,{headers: this.createAuthorizationHeaders() })
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  // getSupplierById(id:number): Observable<Supplier> {
  //   return this.http.get<Supplier>(`${this.URL}/supplier/${id}`,{ headers: this.auth.createAuthorizationHeaders() })
  //     .pipe(
  //       tap(console.log),
  //       catchError(this.handlerError)
  //     )
  // }

  addNewPlant(palantToSave: Plant): Observable<Plant> {
    return this.http.post<Plant>(`${this.URL}`, palantToSave,{headers: this.createAuthorizationHeaders() })
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  editePlant(palantToEdite: Plant): Observable<Plant> {
    return this.http.put<Plant>(`${this.URL}`, palantToEdite,{headers: this.createAuthorizationHeaders() })
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

 

  private handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }
}
