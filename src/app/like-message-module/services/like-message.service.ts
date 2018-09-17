import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LikeMessageRequest } from './models/like-message.request';
import { UnlikeMessageRequest } from './models/unlike-message.request';

/**
 * @see HttpClient wrapper making requests to GroupMe's 'like message' end-point
 */
@Injectable()
export class LikeMessageHttpService {
    private readonly BASE_URL: string = environment.baseApiUrl + '/messages';
    constructor(
        private httpClient: HttpClient
    ) { }

    /**
     * Likes a message
     */
    likeMessage(request: LikeMessageRequest): Observable<any> {
        return this.httpClient.post<any>(`${this.BASE_URL}/${request.conversation_id}/${request.message_id}/like`, request).pipe(
            map(response => response.response),
            catchError(this.handleError)
        );
    }

    /**
     * Unlikes a message
     */
    unlikeMessage(request: UnlikeMessageRequest): Observable<any> {
        return this.httpClient.post<any>(`${this.BASE_URL}/${request.conversation_id}/${request.message_id}/unlike`, request).pipe(
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
