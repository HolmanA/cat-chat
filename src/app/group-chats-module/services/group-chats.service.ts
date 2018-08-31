import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupChatsHttpService {
  constructor(
    private httpClient: HttpClient
  ) { }

  fetchGroups(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseApiUrl}/groups`).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  fetchGroup(id: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseApiUrl}/groups/${id}`).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  fetchMessages(id: string, beforeId: string = '', sinceId: string = '', afterId: string = '', limit: number = 20): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseApiUrl}/groups/${id}/messages?before_id=${beforeId}&since_id=${sinceId}&after_id=${afterId}&limit=${limit}`).pipe(
      map(response => response.response),
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
    return throwError(error);
  }
}
