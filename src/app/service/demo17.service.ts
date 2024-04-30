import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, catchError } from 'rxjs';
import { Plant } from '../model/plant';

@Injectable({
  providedIn: 'root'
})
export class Demo17Service {

  readonly URL: string = environment.URL;

  constructor(private http: HttpClient) { }

  getPlant(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.URL}`)
      .pipe(
        tap(console.log),
        catchError(this.handlleError)
      )
  }

  handlleError(error: HttpErrorResponse): Observable<never> {
    throw new Error('error code' + error.status);
  }


}
