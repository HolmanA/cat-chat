import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FetchDirectChatsRequest } from './models/chats/fetch-direct-chats.request';
import { FetchDirectChatRequest } from './models/direct-messages/fetch-direct-chat.request';
import { CreateDirectChatRequest } from './models/direct-messages/create-direct-chat.request';


@Injectable()
export class DirectChatsHttpService {
    private readonly BASE_URL: string = environment.baseApiUrl;
    constructor(
        private httpClient: HttpClient
    ) { }

    /****************** Chats Endpoint *************************/

    /**
     * Fetches all direct message chats
     */
    fetchDirectChats(request: FetchDirectChatsRequest): Observable<any> {
        return this.httpClient.get<any>(`${this.BASE_URL}/chats?page=${request.page}&per_page=${request.perPage}`).pipe(
            map(response => response.response),
            catchError(this.handleError)
        );
    }

    /****************** Direct Messages Endpoint *************************/

    fetchDirectChat(request: FetchDirectChatRequest): Observable<any> {
        return this.httpClient.get<any>(`${this.BASE_URL}/direct_messages?other_user_id=${request.other_user_id}&before_id=${request.before_id}&since_id=${request.since_id}`).pipe(
            map(response => response.response),
            catchError(this.handleError)
        );
    }

    /**
     * Creates a new message in a direct chat
     */
    createMessage(request: CreateDirectChatRequest): Observable<any> {
        return this.httpClient.post<any>(`${this.BASE_URL}/direct_messages`, request.body).pipe(
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
