import { v4 as uuid } from 'uuid';
import { Action, StateContext, State, Store } from '@ngxs/store';
import * as SelectedChatsStateActions from '../actions/selected-chats.actions';
import * as GroupMessagesContainerActions from '../../ui-module/group-messages/actions/group-messages-container.actions';
import * as GroupMessagesListItemContainerActions from '../../ui-module/group-messages/actions/group-messages-list-item-container.actions';
import * as GroupChatsContainerActions from '../../ui-module/group-chats/actions/group-chats-container.actions';
import * as WebSocketServiceActions from '../../web-socket-module/actions/web-socket.actions';
import { SelectedChat } from './models/selected-chat';
import { FetchMessagesRequest } from '../../group-chats-module/services/models/messages/fetch-messages.request';
import { GroupChatsHttpService } from '../../group-chats-module/services/group-chats.service';
import { tap, catchError } from 'rxjs/operators';
import { asapScheduler, of, Observable, throwError } from 'rxjs';
import { ChatType } from './models/chat-type';
import { CreateMessageRequest } from '../../group-chats-module/services/models/messages/create-message.request';
import { LikeMessageRequest } from '../../like-message-module/services/models/like-message.request';
import { LikeMessageHttpService } from '../../like-message-module/services/like-message.service';
import { UnlikeMessageRequest } from '../../like-message-module/services/models/unlike-message.request';

export interface SelectedChatsStateModel {
    selectedChats: SelectedChat[];
}

const defaults: SelectedChatsStateModel = {
    selectedChats: []
};

@State<SelectedChatsStateModel>({
    name: 'selectedChats',
    defaults
})

export class SelectedChatsState {
    static readonly MAX_CHATS = 3;

    constructor(
        private groupChatsService: GroupChatsHttpService,
        private likeMessageService: LikeMessageHttpService
    ) {}

    @Action(GroupChatsContainerActions.GroupChatSelected)
    fetchGroup({ getState, patchState, dispatch }: StateContext<SelectedChatsStateModel>, { groupChat }: GroupChatsContainerActions.GroupChatSelected) {
        const selectedChats = getState().selectedChats;

        // Close group chat if it is already open
        const chatIndex = selectedChats.findIndex(chat => chat.chat.id === groupChat.id);
        if (chatIndex >= 0) {
            asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.ChatClosed(chatIndex)));
            return;
        }

        const request = new FetchMessagesRequest();
        request.group_id = groupChat.id;

        return this.groupChatsService.fetchMessages(request).pipe(
            tap(messages => {
                // Add the newly opened group chat to the beginning of the selected chats array
                selectedChats.unshift({
                    chat: groupChat,
                    type: ChatType.GROUP,
                    messages: [messages],
                    newMessage: null
                } as SelectedChat);

                // Remove the last chat if exceeding max chats
                if (selectedChats.length > SelectedChatsState.MAX_CHATS) {
                    selectedChats.pop();
                }

                patchState({
                    selectedChats: selectedChats
                });

                asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.FetchGroupChatSucceeded(groupChat.id)));
            }),
            catchError(error => {
                asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.FetchGroupChatFailed(error)));
                return throwError(error);
            })
        );
    }

    @Action(SelectedChatsStateActions.ChatClosed)
    chatClosed({ getState, patchState }: StateContext<SelectedChatsStateModel>, action: SelectedChatsStateActions.ChatClosed) {
        const selectedChats = getState().selectedChats;
        const start = selectedChats.slice(0, action.index);
        const end = selectedChats.slice(action.index);
        end.shift();
        patchState({
            selectedChats: start.concat(end)
        });
    }

    @Action(GroupMessagesContainerActions.ScrolledToTop)
    loadMoreMessages({ patchState, getState, dispatch }: StateContext<SelectedChatsStateModel>, action: GroupMessagesContainerActions.ScrolledToTop) {
        const selectedChats = getState().selectedChats;
        const chatIndex = selectedChats.findIndex(chat => chat.chat.id === action.chatId);

        if (chatIndex < 0) {
            // TODO: Create custom alert/ log
            return;
        }

        const selectedChat = selectedChats[chatIndex];
        const oldestMessageId = selectedChat.messages[0][0].id;
        const request: FetchMessagesRequest = new FetchMessagesRequest();
        request.group_id = selectedChat.chat.id;
        request.before_id = oldestMessageId;

        return this.groupChatsService.fetchMessages(request).pipe(
            tap(messages => {
                selectedChats[chatIndex].messages = [messages, ...selectedChat.messages];

                patchState({
                    selectedChats: selectedChats
                });

                asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.LoadMoreMessagesSucceeded(action.chatId)));
            }),
            catchError(error => {
                return of(asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.LoadMoreMessagesFailed(error))));
            })
        );
    }

    @Action([
        SelectedChatsStateActions.CreateMessageSucceeded,
        SelectedChatsStateActions.LikeMessageSucceeded,
        SelectedChatsStateActions.UnlikeMessageSucceeded,
        WebSocketServiceActions.MessageRecievedOpenChat])
    refreshMessages({ patchState, getState, dispatch }: StateContext<SelectedChatsStateModel>, action: SelectedChatsStateActions.CreateMessageSucceeded | SelectedChatsStateActions.LikeMessageSucceeded | SelectedChatsStateActions.UnlikeMessageSucceeded) {
        const selectedChats = getState().selectedChats;
        const chatIndex = selectedChats.findIndex(chat => chat.chat.id === action.chatId);

        if (chatIndex < 0) {
            // TODO: Create custom alert/ log
            return;
        }

        const selectedChat = selectedChats[chatIndex];
        const request: FetchMessagesRequest = new FetchMessagesRequest();
        request.group_id = selectedChat.chat.id;

        return this.groupChatsService.fetchMessages(request).pipe(
            tap(messages => {
                selectedChats[chatIndex].messages = [messages];
                patchState({
                    selectedChats: selectedChats
                });
                asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.FetchGroupChatSucceeded(action.chatId)));
            }),
            catchError(error => {
                return of(asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.FetchGroupChatFailed(error))));
            })
        );
    }

    @Action(GroupMessagesContainerActions.SendMessage)
    sendMessage({ getState, dispatch }: StateContext<SelectedChatsStateModel>, action: GroupMessagesContainerActions.SendMessage) {
        const selectedChats = getState().selectedChats;
        const chatIndex = selectedChats.findIndex(chat => chat.chat.id === action.chatId);

        if (chatIndex < 0) {
            // TODO: Create custom alert/ log
            return;
        }

        const selectedChat = selectedChats[chatIndex];
        const body = {
            message: {
                text: action.content.text,
                source_guid: uuid()
            }
        };
        const request: CreateMessageRequest = new CreateMessageRequest();
        request.group_id = selectedChat.chat.id;
        request.body = body;

        return this.groupChatsService.createMessage(request).pipe(
            tap((_) => {
                asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.CreateMessageSucceeded(action.chatId)));
            }),
            catchError(error => {
                return of(asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.CreateMessageFailed(error))));
            })
        );
    }

    @Action(GroupMessagesListItemContainerActions.LikeMessage)
    likeMessage({ getState, dispatch }: StateContext<SelectedChatsStateModel>, action: GroupMessagesListItemContainerActions.LikeMessage) {
        const selectedChats = getState().selectedChats;
        const chatIndex = selectedChats.findIndex(chat => chat.chat.id === action.chatId);

        if (chatIndex < 0) {
            // TODO: Create custom alert/ log
            return;
        }

        const selectedChat = selectedChats[chatIndex];
        const request: LikeMessageRequest = new LikeMessageRequest();
        request.conversation_id = selectedChat.chat.id;
        request.message_id = action.messageId;

        return this.likeMessageService.likeMessage(request).pipe(
            tap((_) => {
                asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.LikeMessageSucceeded(action.chatId)));
            }),
            catchError(error => {
                return of(asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.LikeMessageFailed(error))));
            })
        );
    }

    @Action(GroupMessagesListItemContainerActions.UnlikeMessage)
    unlikeMessage({ getState, dispatch }: StateContext<SelectedChatsStateModel>, action: GroupMessagesListItemContainerActions.UnlikeMessage) {
        const selectedChats = getState().selectedChats;
        const chatIndex = selectedChats.findIndex(chat => chat.chat.id === action.chatId);

        if (chatIndex < 0) {
            // TODO: Create custom alert/ log
            return;
        }

        const selectedChat = selectedChats[chatIndex];
        const request: UnlikeMessageRequest = new UnlikeMessageRequest();
        request.conversation_id = selectedChat.chat.id;
        request.message_id = action.messageId;

        return this.likeMessageService.unlikeMessage(request).pipe(
            tap(_ => {
                asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.UnlikeMessageSucceeded(action.chatId)));
            }),
            catchError(error => {
                return of(asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.UnlikeMessageFailed(error))));
            })
        );
    }
}
