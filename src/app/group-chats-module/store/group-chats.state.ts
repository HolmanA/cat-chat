import { v4 as uuid } from 'uuid';
import { Action, StateContext, State } from '@ngxs/store';
import * as GroupChatsStateActions from '../actions/group-chats.actions';
import * as GroupChatsContainerActions from '../../ui-module/group-chats/actions/group-chats-container.actions';
import * as GroupMessagesContainerActions from '../../ui-module/group-messages/actions/group-messages-container.actions';
import { catchError, tap } from 'rxjs/operators';
import { asapScheduler, of, Observable } from 'rxjs';
import { GroupChatsHttpService } from '../services/group-chats.service';
import { FetchGroupsRequest } from '../services/models/groups/fetch-groups.request';
import { FetchMessagesRequest } from '../services/models/messages/fetch-messages.request';
import { CreateMessageRequest } from '../services/models/messages/create-message.request';

export interface GroupChatsStateModel {
    groupChats: any[];
    selectedGroupChat: {
        id: string;
        messages: any;
    };
    newMessage: any;
}

const defaults: GroupChatsStateModel = {
    groupChats: [],
    selectedGroupChat: null,
    newMessage: null
};

@State<GroupChatsStateModel>({
    name: 'groupChats',
    defaults
})

export class GroupChatsState {
    constructor(private groupChatsService: GroupChatsHttpService) { }

    @Action([GroupChatsContainerActions.Initialized, GroupChatsStateActions.CreateMessageSucceeded])
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

    @Action(GroupChatsContainerActions.GroupChatSelected)
    fetchGroup({ patchState, dispatch }: StateContext<GroupChatsStateModel>, { groupChat }: GroupChatsContainerActions.GroupChatSelected) {
        const request: FetchMessagesRequest = new FetchMessagesRequest();
        request.group_id = groupChat.group_id;

        return this.groupChatsService.fetchMessages(request).pipe(
            tap(messages => {
                patchState({
                    selectedGroupChat: {
                        ...groupChat,
                        messages: messages
                    }
                });
                asapScheduler.schedule(() => dispatch(new GroupChatsStateActions.FetchGroupChatSucceeded()));
            }),
            catchError(error => {
                return of(asapScheduler.schedule(() => dispatch(new GroupChatsStateActions.FetchGroupChatFailed(error))));
            })
        );
    }

    @Action(GroupChatsStateActions.CreateMessageSucceeded)
    refreshMessages({ patchState, getState, dispatch }: StateContext<GroupChatsStateModel>) {
        const selectedChat = getState().selectedGroupChat;
        const request: FetchMessagesRequest = new FetchMessagesRequest();
        request.group_id = selectedChat.id;


        return this.groupChatsService.fetchMessages(request).pipe(
            tap(messages => {
                patchState({
                    selectedGroupChat: {
                        ...selectedChat,
                        messages: messages
                    }
                });
                asapScheduler.schedule(() => dispatch(new GroupChatsStateActions.FetchGroupChatSucceeded()));
            }),
            catchError(error => {
                return of(asapScheduler.schedule(() => dispatch(new GroupChatsStateActions.FetchGroupChatFailed(error))));
            })
        );
    }

    @Action(GroupMessagesContainerActions.SendMessage)
    sendMessage({ getState, dispatch }: StateContext<GroupChatsStateModel>, { content }: GroupMessagesContainerActions.SendMessage) {
        const state = getState();
        const body = {
            message: {
                text: content.text,
                source_guid: uuid()
            }
        };
        const request: CreateMessageRequest = new CreateMessageRequest();
        request.group_id = state.selectedGroupChat.id;
        request.body = body;

        return this.groupChatsService.createMessage(request).pipe(
            tap(_ => {
                asapScheduler.schedule(() => dispatch(new GroupChatsStateActions.CreateMessageSucceeded()));
            }),
            catchError(error => {
                return of(asapScheduler.schedule(() => dispatch(new GroupChatsStateActions.CreateMessageFailed(error))));
            })
        );
    }
}
