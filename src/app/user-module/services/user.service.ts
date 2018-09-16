import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UpdateUserRequest } from './models/update-user.request';

/**
 * @see HttpClient wrapper making requests to GroupMe's 'users' end-point
 */
@Injectable()
export class UserHttpService {
  private readonly BASE_URL: string = environment.baseApiUrl + '/users';
  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Fetches details about the authenticated user
   */
  fetchUser(): Observable<any> {
    return this.httpClient.get<any>(`${this.BASE_URL}/me`).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  /**
   * Updates details about the authenticated user
   * @param request The request
   */
  updateUser(request: UpdateUserRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.BASE_URL}/update`, request.body).pipe(
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
