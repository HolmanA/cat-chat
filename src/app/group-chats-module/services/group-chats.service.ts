import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FetchGroupsRequest } from './models/groups/fetch-groups.request';
import { FetchGroupRequest } from './models/groups/fetch-group.request';
import { CreateGroupRequest } from './models/groups/create-group.request';
import { UpdateGroupRequest } from './models/groups/update-group.request';
import { DestroyGroupRequest } from './models/groups/destroy-group.request';
import { JoinGroupRequest } from './models/groups/join-group.request';
import { ReJoinGroupRequest } from './models/groups/re-join-group.request';
import { ChangeOwnersRequest } from './models/groups/change-owners.request';
import { AddMembersRequest } from './models/members/add-members.request';
import { AddMembersResultsRequest } from './models/members/add-members-results.request';
import { RemoveMemberRequest } from './models/members/remove-member.request';
import { UpdateMembershipRequest } from './models/memberships/update-membership.request';
import { FetchMessagesRequest } from './models/messages/fetch-messages.request';
import { CreateMessageRequest } from './models/messages/create-message.request';

/**
 * @see HttpClient wrapper making requests to GroupMe's 'groups/' end-point
 */
@Injectable()
export class GroupChatsHttpService {
  private readonly BASE_URL: string = environment.baseApiUrl + '/groups';
  constructor(
    private httpClient: HttpClient
  ) { }


  /****************** Groups Endpoint *************************/

  /**
   * Fetches all groups
   */
  fetchGroups(request: FetchGroupsRequest): Observable<any> {
    return this.httpClient.get<any>(`${this.BASE_URL}?page=${request.page}&per_page=${request.perPage}&omit=${request.omit}`).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  /**
   * Fetches all former groups
   */
  fetchFormerGroups(): Observable<any> {
    return this.httpClient.get<any>(`${this.BASE_URL}/former`).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  /**
   * Fetches a single group
   */
  fetchGroup(request: FetchGroupRequest): Observable<any> {
    return this.httpClient.get<any>(`${this.BASE_URL}/${request.id}`).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  /**
   * Creates a new group
   */
  createGroup(request: CreateGroupRequest): Observable<any> {
    return this.httpClient.post<any>(this.BASE_URL, request).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  /**
   * Updates a group
   */
  updateGroup(request: UpdateGroupRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.BASE_URL}/${request.id}/update`, request.body).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a group
   */
  destroyGroup(request: DestroyGroupRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.BASE_URL}/${request.id}/destroy`, request).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  /**
   * Joins a group
   */
  joinGroup(request: JoinGroupRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.BASE_URL}/${request.id}/join/${request.share_token}`, request).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  /**
   * Re-joins a group
   */
  reJoinGroup(request: ReJoinGroupRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.BASE_URL}/join`, request.body).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  /**
   * Changes a groups owner
   */
  changeOwners(request: ChangeOwnersRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.BASE_URL}/change_owners`, request.body).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  /****************** Members Endpoint *************************/

  /**
   * Adds members to a group
   */
  addMembers(request: AddMembersRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.BASE_URL}/${request.group_id}/members/add`, request.body).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  /**
   * Fetches the results of an @see addMembers call
   */
  addMembersResults(request: AddMembersResultsRequest): Observable<any> {
    return this.httpClient.get<any>(`${this.BASE_URL}/${request.group_id}/members/results/${request.results_id}`).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  /**
   * Removes a member from a group
   */
  removeMember(request: RemoveMemberRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.BASE_URL}/${request.group_id}/members/${request.body.membership_id}/remove`, request.body).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  /****************** Memberships Endpoint *************************/

  // TODO: test this endpoint for valid request format
  /**
   * Updates this user's membership information for a group
   */
  updateMembership(request: UpdateMembershipRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.BASE_URL}/${request.group_id}/memberships/update`, request.body).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }


  /****************** Messages Endpoint *************************/

  /**
   * Fetches messages for a group
   */
  fetchMessages(request: FetchMessagesRequest): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseApiUrl}/${request.group_id}/messages?before_id=${request.before_id}&since_id=${request.since_id}&after_id=${request.after_id}&limit=${request.limit}`).pipe(
      map(response => response.response),
      catchError(this.handleError)
    );
  }

  /**
   * Creates a new message in a group
   */
  createMessage(request: CreateMessageRequest): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseApiUrl}/${request.group_id}/messages`, request.body).pipe(
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
