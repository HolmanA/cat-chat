import { Action, StateContext, State } from '@ngxs/store';
import * as DirectChatsStateActions from '../actions/direct-chats.actions';
import * as DirectChatsContainerActions from '../../ui-module/direct-chats/actions/direct-chats-container.actions';
import * as SelectedChatsStateActions from '../../selected-chats-module/actions/selected-chats.actions';
import { catchError, tap } from 'rxjs/operators';
import { asapScheduler, of, Observable } from 'rxjs';
import { DirectChatsHttpService } from '../services/direct-chats.service';
import { FetchDirectChatsRequest } from '../services/models/chats/fetch-direct-chats.request';
import * as MessageQueueStateActions from '../../message-queue-module/actions/message-queue.actions';

export interface DirectChatsStateModel {
    directChats: any[];
}

const defaults: DirectChatsStateModel = {
    directChats: []
};

@State<DirectChatsStateModel>({
    name: 'directChats',
    defaults
})

export class DirectChatsState {
    constructor(private directChatsService: DirectChatsHttpService) { }

    @Action([DirectChatsContainerActions.Initialized, SelectedChatsStateActions.CreateMessageSucceeded, MessageQueueStateActions.MessageReceived])
    fetchGroups({ patchState, dispatch }: StateContext<DirectChatsStateModel>) {
        const request = new FetchDirectChatsRequest();
        return this.directChatsService.fetchDirectChats(request).pipe(
            tap(directChats => {
                patchState({
                    directChats: directChats
                });
                asapScheduler.schedule(() => dispatch(new DirectChatsStateActions.FetchDirectChatsSucceeded()));
            }),
            catchError(error => {
                return of(asapScheduler.schedule(() => dispatch(new DirectChatsStateActions.FetchDirectChatsFailed(error))));
            })
        );
    }
}
