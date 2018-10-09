import { v4 as uuid } from 'uuid';
import { Action, StateContext, State } from '@ngxs/store';
import * as GroupChatsStateActions from '../actions/group-chats.actions';
import * as GroupChatsContainerActions from '../../ui-module/group-chats/actions/group-chats-container.actions';
import * as SelectedChatsStateActions from '../../selected-chats-module/actions/selected-chats.actions';
import * as GroupMessagesContainerActions from '../../ui-module/group-messages/actions/group-messages-container.actions';
import * as GroupMessagesListItemContainerActions from '../../ui-module/group-messages/actions/group-messages-list-item-container.actions';
import { catchError, tap } from 'rxjs/operators';
import { asapScheduler, of, Observable } from 'rxjs';
import { GroupChatsHttpService } from '../services/group-chats.service';
import { FetchGroupsRequest } from '../services/models/groups/fetch-groups.request';

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

    @Action([GroupChatsContainerActions.Initialized, SelectedChatsStateActions.CreateMessageSucceeded])
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
