import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  constructor(
    private httpClient: HttpClient
  ) { }

  fetchUser(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseApiUrl}/users/me`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occured: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}\n
        body was: ${error.error}`);
    }
    return throwError('Something bad happened :\'(');
  }
}
