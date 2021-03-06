import { v4 as uuid } from 'uuid';
import { Action, StateContext, State, Store } from '@ngxs/store';
import * as SelectedChatsStateActions from '../actions/selected-chats.actions';
import * as GroupMessagesContainerActions from '../../ui-module/group-messages/actions/group-messages-container.actions';
import * as DirectMessagesContainerActions from '../../ui-module/direct-messages/actions/direct-messages-container.actions';
import * as GroupMessagesListItemContainerActions from '../../ui-module/group-messages/actions/group-messages-list-item-container.actions';
import * as DirectMessagesListItemContainerActions from '../../ui-module/direct-messages/actions/direct-messages-list-item-container.actions';
import * as GroupChatsContainerActions from '../../ui-module/group-chats/actions/group-chats-container.actions';
import * as DirectChatsContainerActions from '../../ui-module/direct-chats/actions/direct-chats-container.actions';
import * as MessageQueueStateActions from '../../message-queue-module/actions/message-queue.actions';
import { SelectedChat } from './models/selected-chat';
import { FetchMessagesRequest } from '../../group-chats-module/services/models/messages/fetch-messages.request';
import { FetchDirectChatRequest } from '../../direct-chats-module/services/models/direct-messages/fetch-direct-chat.request';
import { GroupChatsHttpService } from '../../group-chats-module/services/group-chats.service';
import { DirectChatsHttpService } from '../../direct-chats-module/services/direct-chats.service';
import { tap, catchError } from 'rxjs/operators';
import { asapScheduler, of, Observable, throwError } from 'rxjs';
import { ChatType } from './models/chat-type';
import { CreateMessageRequest } from '../../group-chats-module/services/models/messages/create-message.request';
import { CreateDirectChatRequest } from '../../direct-chats-module/services/models/direct-messages/create-direct-chat.request';
import { LikeMessageRequest } from '../../like-message-module/services/models/like-message.request';
import { LikeMessageHttpService } from '../../like-message-module/services/like-message.service';
import { UnlikeMessageRequest } from '../../like-message-module/services/models/unlike-message.request';
import { WebSocketManagerService } from 'src/app/root-module/services/web-socket/web-socket-manager.service';
import { GroupChannelConfiguration } from 'src/app/root-module/services/web-socket/models/group-channel-configuration';
import { DirectChannelConfiguration } from 'src/app/root-module/services/web-socket/models/direct-channel-configuration';
import { UserSelectors } from 'src/app/user-module/store/user.selectors';

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
        private store: Store,
        private groupChatsService: GroupChatsHttpService,
        private directChatsService: DirectChatsHttpService,
        private likeMessageService: LikeMessageHttpService,
        private socketManager: WebSocketManagerService
    ) {}

    @Action(GroupChatsContainerActions.GroupChatSelected)
    fetchGroup({ getState, patchState, dispatch }: StateContext<SelectedChatsStateModel>, { groupChat }: GroupChatsContainerActions.GroupChatSelected) {
        const selectedChats = getState().selectedChats;
        // Close group chat if it is already open
        const chatOpen = selectedChats.find(chat => {
            return chat.type === ChatType.GROUP && chat.chat.id === groupChat.id;
        });

        if (chatOpen) {
            this.socketManager.unsubscribeFromChannel(groupChat.id);
            asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.ChatClosed(selectedChats.indexOf(chatOpen))));
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
                    const closedChat = selectedChats.pop();
                    if (closedChat.type === ChatType.GROUP) {
                        this.socketManager.unsubscribeFromChannel(closedChat.chat.id);
                    } else {
                        this.socketManager.unsubscribeFromChannel(closedChat.chat.other_user.id);
                    }
                }

                patchState({
                    selectedChats: selectedChats
                });

                this.socketManager.subscribeToChannel(new GroupChannelConfiguration(
                    groupChat.id,
                    () => dispatch(new SelectedChatsStateActions.ChatChannelConnectionEstablished(groupChat.id)),
                    (event: CloseEvent) => dispatch(new SelectedChatsStateActions.ChatChannelConnectionClosed(groupChat.id, event)),
                    (event: Event) => dispatch(new SelectedChatsStateActions.ChatChannelConnectionError(groupChat.id, event)),
                    (data: any) => dispatch(new SelectedChatsStateActions.ChatChannelMessageReceived(groupChat.id, data))
                ));
                asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.FetchGroupChatSucceeded(groupChat.id)));
            }),
            catchError(error => {
                asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.FetchGroupChatFailed(error)));
                return throwError(error);
            })
        );
    }

    @Action(DirectChatsContainerActions.DirectChatSelected)
    fetchDirect({ getState, patchState, dispatch }: StateContext<SelectedChatsStateModel>, { directChat }: DirectChatsContainerActions.DirectChatSelected) {
        const selectedChats = getState().selectedChats;
        const channelId = directChat.last_message.conversation_id.replace('+' , '_');
        // Close direct chat if it is already open
        const chatOpen = selectedChats.find(chat => {
            return chat.type === ChatType.DIRECT && chat.chat.other_user.id === directChat.other_user.id;
        });

        if (chatOpen) {
            this.socketManager.unsubscribeFromChannel(directChat.other_user.id);
            asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.ChatClosed(selectedChats.indexOf(chatOpen))));
            return;
        }

        const request = new FetchDirectChatRequest();
        request.other_user_id = directChat.other_user.id;
        return this.directChatsService.fetchDirectChatMessages(request).pipe(
            tap(messages => {
                // Add the newly opened group chat to the beginning of the selected chats array
                selectedChats.unshift({
                    chat: directChat,
                    type: ChatType.DIRECT,
                    messages: [messages],
                    newMessage: null
                } as SelectedChat);

                // Remove the last chat if exceeding max chats
                if (selectedChats.length > SelectedChatsState.MAX_CHATS) {
                    const closedChat = selectedChats.pop();
                    if (closedChat.type === ChatType.DIRECT) {
                        this.socketManager.unsubscribeFromChannel(closedChat.chat.other_user.id);
                    } else {
                        this.socketManager.unsubscribeFromChannel(closedChat.chat.id);
                    }
                }

                patchState({
                    selectedChats: selectedChats
                });

                this.socketManager.subscribeToChannel(new DirectChannelConfiguration(
                    directChat.other_user.id,
                    channelId,
                    () => dispatch(new SelectedChatsStateActions.ChatChannelConnectionEstablished(directChat.other_user.id)),
                    (event: CloseEvent) => dispatch(new SelectedChatsStateActions.ChatChannelConnectionClosed(directChat.other_user.id, event)),
                    (event: Event) => dispatch(new SelectedChatsStateActions.ChatChannelConnectionError(directChat.other_user.id, event)),
                    (data: any) => dispatch(new SelectedChatsStateActions.ChatChannelMessageReceived(directChat.other_user.id, data))
                ));
                asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.FetchDirectChatSucceeded(directChat.last_message.conversation_id)));
            }),
            catchError(error => {
                asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.FetchDirectChatFailed(error)));
                return throwError(error);
            })
        );
    }

    @Action(SelectedChatsStateActions.ChatChannelConnectionEstablished)
    connectionOpened({ getState, patchState }: StateContext<SelectedChatsStateModel>, action: SelectedChatsStateActions.ChatChannelConnectionEstablished) {
        const selectedChats = getState().selectedChats;
        const selectedChat = selectedChats.find(chat => {
            return chat.type === ChatType.GROUP && chat.chat.id === action.chatId ||
            chat.type === ChatType.DIRECT && chat.chat.other_user.id === action.chatId;
        });
        if (selectedChat) {
            selectedChat.socketConnectionOpen = true;
            patchState({selectedChats: selectedChats});
        }
    }

    @Action(SelectedChatsStateActions.ChatChannelConnectionClosed)
    connectionClosed({ getState, patchState }: StateContext<SelectedChatsStateModel>, action: SelectedChatsStateActions.ChatChannelConnectionClosed) {
        const selectedChats = getState().selectedChats;
        const selectedChat = selectedChats.find(chat => {
            return chat.type === ChatType.GROUP && chat.chat.id === action.chatId ||
            chat.type === ChatType.DIRECT && chat.chat.other_user.id === action.chatId;
        });
        if (selectedChat) {
            selectedChat.socketConnectionOpen = false;
            patchState({selectedChats: selectedChats});
        }
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
        const selectedChat = selectedChats.find(chat => {
            return chat.type === ChatType.GROUP && chat.chat.id === action.chatId;
        });
        if (!selectedChat) {
            return;
        }


        const oldestMessageId = selectedChat.messages[0][0].id;
        const request: FetchMessagesRequest = new FetchMessagesRequest();
        request.group_id = selectedChat.chat.id;
        request.before_id = oldestMessageId;

        return this.groupChatsService.fetchMessages(request).pipe(
            tap(messages => {
                selectedChat.messages = [messages, ...selectedChat.messages];
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

    @Action(DirectMessagesContainerActions.ScrolledToTop)
    loadMoreDirectMessages({ patchState, getState, dispatch }: StateContext<SelectedChatsStateModel>, action: DirectMessagesContainerActions.ScrolledToTop) {
        const selectedChats = getState().selectedChats;
        const selectedChat = selectedChats.find(chat => {
            return chat.type === ChatType.DIRECT && chat.chat.other_user.id === action.chatId;
        });
        if (!selectedChat) {
            return;
        }

        const oldestMessageId = selectedChat.messages[0][0].id;
        const request: FetchDirectChatRequest = new FetchDirectChatRequest();
        request.other_user_id = selectedChat.chat.other_user.id;
        request.before_id = oldestMessageId;

        return this.directChatsService.fetchDirectChatMessages(request).pipe(
            tap(messages => {
                selectedChat.messages = [messages, ...selectedChat.messages];
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
        SelectedChatsStateActions.UnlikeMessageSucceeded
    ])
    messageUnliked({ patchState, getState }: StateContext<SelectedChatsStateModel>, action: SelectedChatsStateActions.UnlikeMessageSucceeded) {
        const selectedChats = getState().selectedChats;
        const selectedChat = selectedChats.find(chat => {
            return chat.type === ChatType.GROUP && chat.chat.id === action.chatId ||
            chat.type === ChatType.DIRECT && chat.chat.other_user.id === action.chatId;
        });
        if (!selectedChat) {
            // TODO: Create custom alert/ log
            return;
        }

        const userId = this.store.selectSnapshot(UserSelectors.getUserId);
        const messagePages = selectedChat.messages;

        this.toggleLike(messagePages, action.messageId, userId);

        patchState({
            selectedChats: selectedChats
        });
    }

    @Action([
        SelectedChatsStateActions.CreateMessageSucceeded,
        MessageQueueStateActions.MessageRecievedOpenChat
    ])
    fetchNewerMessages({ patchState, getState, dispatch }: StateContext<SelectedChatsStateModel>, action: MessageQueueStateActions.MessageRecievedOpenChat | SelectedChatsStateActions.CreateMessageSucceeded) {
        const selectedChats = getState().selectedChats;
        const selectedChat = selectedChats.find(chat => {
            return chat.type === ChatType.GROUP && chat.chat.id === action.chatId;
        });
        if (!selectedChat) {
            // TODO: Create custom alert/ log
            return;
        }
        const newestPage = selectedChat.messages[selectedChat.messages.length - 1];
        const newestMessageId = newestPage[newestPage.length - 1].id;

        const request: FetchMessagesRequest = new FetchMessagesRequest();
        request.group_id = selectedChat.chat.id;
        request.after_id = newestMessageId;

        return this.groupChatsService.fetchMessages(request).pipe(
            tap(messages => {
                selectedChat.messages = [...selectedChat.messages, messages];

                patchState({
                    selectedChats: selectedChats
                });

                asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.FetchNewerMessagesSucceeded(action.chatId)));
            }),
            catchError(error => {
                return of(asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.FetchNewerMessagesFailed(error))));
            })
        );
    }

    @Action([
        SelectedChatsStateActions.CreateMessageSucceeded,
        MessageQueueStateActions.MessageRecievedOpenChat
    ])
    fetchNewerDirectMessages({ patchState, getState, dispatch }: StateContext<SelectedChatsStateModel>, action: MessageQueueStateActions.MessageRecievedOpenChat | SelectedChatsStateActions.CreateMessageSucceeded) {
        const selectedChats = getState().selectedChats;
        const selectedChat = selectedChats.find(chat => {
            return chat.type === ChatType.DIRECT && chat.chat.last_message.conversation_id === action.chatId ||
            chat.type === ChatType.DIRECT && chat.chat.other_user.id === action.chatId;
        });
        if (!selectedChat) {
            // TODO: Create custom alert/ log
            return;
        }
        const newestPage = selectedChat.messages[selectedChat.messages.length - 1];
        const newestMessageId = newestPage[newestPage.length - 1].id;

        const request: FetchDirectChatRequest = new FetchDirectChatRequest();
        request.other_user_id = selectedChat.chat.other_user.id;
        request.since_id = newestMessageId;

        return this.directChatsService.fetchDirectChatMessages(request).pipe(
            tap(messages => {
                selectedChat.messages = [...selectedChat.messages, messages];

                patchState({
                    selectedChats: selectedChats
                });

                asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.FetchNewerMessagesSucceeded(action.chatId)));
            }),
            catchError(error => {
                return of(asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.FetchNewerMessagesFailed(error))));
            })
        );
    }

    @Action(GroupMessagesContainerActions.SendMessage)
    sendMessage({ getState, dispatch }: StateContext<SelectedChatsStateModel>, action: GroupMessagesContainerActions.SendMessage) {
        const selectedChats = getState().selectedChats;
        const selectedChat = selectedChats.find(chat => {
            return chat.type === ChatType.GROUP && chat.chat.id === action.chatId;
        });
        if (!selectedChat) {
            // TODO: Create custom alert/ log
            return;
        }

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

    @Action(DirectMessagesContainerActions.SendMessage)
    sendDirectMessage({ getState, dispatch }: StateContext<SelectedChatsStateModel>, action: DirectMessagesContainerActions.SendMessage) {
        const selectedChats = getState().selectedChats;
        const selectedChat = selectedChats.find(chat => {
            return chat.type === ChatType.DIRECT && chat.chat.other_user.id === action.chatId;
        });
        if (!selectedChat) {
            // TODO: Create custom alert/ log
            return;
        }
        const body = {
            message: {
                text: action.content.text,
                source_guid: uuid(),
                recipient_id: action.chatId
            }
        };
        const request: CreateDirectChatRequest = new CreateDirectChatRequest();
        request.body = body;

        return this.directChatsService.createMessage(request).pipe(
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
        const selectedChat = selectedChats.find(chat => {
            return chat.type === ChatType.GROUP && chat.chat.id === action.chatId;
        });
        if (!selectedChat) {
            // TODO: Create custom alert/ log
            return;
        }

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

    @Action(DirectMessagesListItemContainerActions.LikeMessage)
    likeDirectMessage({ getState, dispatch }: StateContext<SelectedChatsStateModel>, action: DirectMessagesListItemContainerActions.LikeMessage) {
        const selectedChats = getState().selectedChats;
        const selectedChat = selectedChats.find(chat => {
            return chat.type === ChatType.DIRECT && chat.chat.other_user.id === action.chatId;
        });
        if (!selectedChat) {
            // TODO: Create custom alert/ log
            return;
        }

        const request: LikeMessageRequest = new LikeMessageRequest();
        request.conversation_id = selectedChat.chat.last_message.conversation_id;
        request.message_id = action.messageId;
        const userId = this.store.selectSnapshot(UserSelectors.getUserId);
        const messagePages = selectedChat.messages;
        this.toggleLike(messagePages, action.messageId, userId);

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
        const selectedChat = selectedChats.find(chat => {
            return chat.type === ChatType.GROUP && chat.chat.id === action.chatId;
        });
        if (!selectedChat) {
            // TODO: Create custom alert/ log
            return;
        }

        const request: UnlikeMessageRequest = new UnlikeMessageRequest();
        request.conversation_id = selectedChat.chat.id;
        request.message_id = action.messageId;

        return this.likeMessageService.unlikeMessage(request).pipe(
            tap(_ => {
                asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.UnlikeMessageSucceeded(action.chatId, action.messageId)));
            }),
            catchError(error => {
                return of(asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.UnlikeMessageFailed(error))));
            })
        );
    }

    @Action(DirectMessagesListItemContainerActions.UnlikeMessage)
    unlikeDirectMessage({ getState, dispatch }: StateContext<SelectedChatsStateModel>, action: DirectMessagesListItemContainerActions.UnlikeMessage) {
        const selectedChats = getState().selectedChats;
        const selectedChat = selectedChats.find(chat => {
            return chat.type === ChatType.DIRECT && chat.chat.other_user.id === action.chatId;
        });
        if (!selectedChat) {
            // TODO: Create custom alert/ log
            return;
        }

        const request: UnlikeMessageRequest = new UnlikeMessageRequest();
        request.conversation_id = selectedChat.chat.last_message.conversation_id;
        request.message_id = action.messageId;

        return this.likeMessageService.unlikeMessage(request).pipe(
            tap(_ => {
                asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.UnlikeMessageSucceeded(action.chatId, action.messageId)));
            }),
            catchError(error => {
                return of(asapScheduler.schedule(() => dispatch(new SelectedChatsStateActions.UnlikeMessageFailed(error))));
            })
        );
    }

    @Action(SelectedChatsStateActions.ChatChannelMessageReceived)
    messageReceived({ dispatch }: StateContext<SelectedChatsStateModel>, action: SelectedChatsStateActions.ChatChannelMessageReceived) {
        switch (action.message.type) {
            case 'favorite' :
                return dispatch(new SelectedChatsStateActions.ChatChannelLikeReceived(action.chatId, action.message.subject));
            default :
                console.error('Unknown message type', action);
        }
    }

    @Action(SelectedChatsStateActions.ChatChannelLikeReceived)
    likeReceived({ getState, patchState }: StateContext<SelectedChatsStateModel>, action: SelectedChatsStateActions.ChatChannelLikeReceived) {
        const selectedChats = getState().selectedChats;
        const chatIndex = selectedChats.findIndex(chat => chat.chat.id === action.chatId);

        if (chatIndex < 0) {
            this.socketManager.unsubscribeFromChannel(action.chatId);
            return;
        }

        const selectedChat = selectedChats[chatIndex];
        const messagePages = selectedChat.messages;
        this.toggleLike(messagePages, action.message.line.id, action.message.user_id);

        patchState({
            selectedChats: selectedChats
        });
    }

    /**
     * Searches through the provided array of message lists for the provided message ID and updates the favorited by array
     * with the provided user ID. The user ID will be added/removed based on its existance. If the message is not found, nothing happens.
     * @param messagePages the array of message pages
     * @param messageId the message ID
     * @param userId the user ID
     */
    private toggleLike(messagePages: any[][], messageId, userId) {
        let likedMessage;
        // It's faster to search from back to front, since newer messages are more likely to be liked
        for (let i = messagePages.length - 1; i >= 0; i--) {
            const messagePage = messagePages[i];
            for (let j = messagePage.length - 1; j >= 0; j--) {
                const message = messagePage[j];
                if (message.id === messageId) {
                    likedMessage = message;
                    break;
                }
            }

            if (likedMessage) {
                break;
            }
        }

        if (likedMessage) {
            const favoritedBy = likedMessage.favorited_by;
            const likedIndex = favoritedBy.findIndex(like => like === userId);
            if (likedIndex >= 0) {
                favoritedBy.splice(likedIndex, 1);
            } else {
                favoritedBy.push(userId);
            }
        }
    }
}
