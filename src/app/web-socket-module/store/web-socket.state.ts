import { Action, StateContext, State, Store } from '@ngxs/store';
import * as WebSocketServiceActions from '../actions/web-socket.actions';
import * as GroupChatsStateActions from '../../group-chats-module/actions/group-chats.actions';
import { GroupChatsSelectors } from '../../group-chats-module/store/group-chats.selectors';
import { MessageQueue } from './models/message-queue';
import { UserSelectors } from '../../user-module/store/user.selectors';

export interface WebSocketStateModel {
    isOpen: boolean;
    messageQueues: MessageQueue[];
}

const defaults: WebSocketStateModel = {
    isOpen: false,
    messageQueues: []
};

@State<WebSocketStateModel>({
    name: 'websocket',
    defaults
})

export class WebSocketState {
    constructor(private store: Store) { }

    @Action(WebSocketServiceActions.ConnectionEstablished)
    connectionOpened({ patchState }: StateContext<WebSocketStateModel>) {
        patchState({
            isOpen: true
        });
    }

    @Action(WebSocketServiceActions.ConnectionClosed)
    connectionClosed({ patchState }: StateContext<WebSocketStateModel>) {
        patchState({
            isOpen: false
        });
    }

    @Action(WebSocketServiceActions.MessageReceived)
    messageReceived({ getState, patchState }: StateContext<WebSocketStateModel>, action: WebSocketServiceActions.MessageReceived) {
        const userId = this.store.selectSnapshot(UserSelectors.getUserId);
        // Ignore all messages from this user
        if (userId === action.message.user_id) {
            return;
        }

        const selectedChatId = this.store.selectSnapshot(GroupChatsSelectors.getSelectedChatId);
        const messageChatId = action.message.group_id || action.message.chat_id;

        // Only queue up message if chat is not open
        if (messageChatId !== selectedChatId) {
            const messageQueues = getState().messageQueues;
            let messageQueue = messageQueues.find(queue => queue.chatId === messageChatId);

            // Create and add a new message queue if one is not found
            if (!messageQueue) {
                messageQueue = {
                    chatId: messageChatId,
                    queue: []
                } as MessageQueue;
                messageQueues.push(messageQueue);
            }
            messageQueue.queue.push(action.message);
            patchState({
                messageQueues: [...messageQueues]
            });
        }
    }

    @Action(GroupChatsStateActions.FetchGroupChatSucceeded)
    clearMessageQueue({ getState, patchState }: StateContext<WebSocketStateModel>, action: GroupChatsStateActions.FetchGroupChatSucceeded) {
        const messageQueues = getState().messageQueues;
        const selectedQueueIndex = messageQueues.findIndex(queue => queue.chatId === action.chatId);
        if (selectedQueueIndex >= 0) {
            messageQueues.splice(selectedQueueIndex, 1);
            patchState({
                messageQueues: [...messageQueues]
            });
        }
    }
}
