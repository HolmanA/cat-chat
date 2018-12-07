import { Action, StateContext, State } from '@ngxs/store';
import * as GroupChatsStateActions from '../actions/group-chats.actions';
import * as GroupChatsContainerActions from '../../ui-module/group-chats/actions/group-chats-container.actions';
import * as SelectedChatsStateActions from '../../selected-chats-module/actions/selected-chats.actions';
import { catchError, tap } from 'rxjs/operators';
import { asapScheduler, of } from 'rxjs';
import { GroupChatsHttpService } from '../services/group-chats.service';
import { FetchGroupsRequest } from '../services/models/groups/fetch-groups.request';
import * as MessageQueueStateActions from '../../message-queue-module/actions/message-queue.actions';

export interface GroupChatsStateModel {
    groupChats: any[];
}

const defaults: GroupChatsStateModel = {
    groupChats: []
};

@State<GroupChatsStateModel>({
    name: 'groupChats',
    defaults
})

export class GroupChatsState {
    constructor(private groupChatsService: GroupChatsHttpService) { }

    @Action([GroupChatsContainerActions.Initialized, SelectedChatsStateActions.CreateMessageSucceeded, MessageQueueStateActions.MessageReceived])
    fetchGroups({ patchState, dispatch }: StateContext<GroupChatsStateModel>) {
        const request = new FetchGroupsRequest();

        return this.groupChatsService.fetchGroups(request).pipe(
            tap(groupChats => {
                patchState({
                    groupChats: groupChats
                });
                asapScheduler.schedule(() => dispatch(new GroupChatsStateActions.FetchGroupChatsSucceeded()));
            }),
            catchError(error => {
                return of(asapScheduler.schedule(() => dispatch(new GroupChatsStateActions.FetchGroupChatsFailed(error))));
            })
        );
    }
}
