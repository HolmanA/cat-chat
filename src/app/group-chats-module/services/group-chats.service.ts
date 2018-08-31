import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

/**
 * @see HttpClient wrapper making requests to GroupMe's 'groups/' end-point
 */
@Injectable()
export class GroupChatsHttpService {
  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Fetches all groups
   */
  fetchGroups(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseApiUrl}/groups`).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  /**
   * Fetches a single group
   * @param id group id
   */
  fetchGroup(id: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseApiUrl}/groups/${id}`).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  /**
   * Fetches messages for the specified group
   * @param id group id
   * @param beforeId query messages before this id
   * @param sinceId query newest messages since this id
   * @param afterId query messages directly after this Id
   * @param limit message limit
   */
  fetchMessages(id: string, beforeId: string = '', sinceId: string = '', afterId: string = '', limit: number = 20): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseApiUrl}/groups/${id}/messages?before_id=${beforeId}&since_id=${sinceId}&after_id=${afterId}&limit=${limit}`).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  /**
   * Generic error handler
   * @param error http error
   */
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
