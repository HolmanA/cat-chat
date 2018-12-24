import { Action, StateContext, State, Store } from '@ngxs/store';
import * as UserStateActions from '../../user-module/actions/user.actions';
import * as MessageQueueStateActions from '../actions/message-queue.actions';
import * as SelectedChatsStateActions from '../../selected-chats-module/actions/selected-chats.actions';
import { MessageQueue } from './models/message-queue';
import { UserSelectors } from '../../user-module/store/user.selectors';
import { SelectedChatsSelectors } from '../../selected-chats-module/store/selected-chats.selectors';
import { asapScheduler } from 'rxjs';
import { WebSocketManagerService } from 'src/app/root-module/services/web-socket/web-socket-manager.service';
import { UserChannelConfiguration } from 'src/app/root-module/services/web-socket/models/user-channel-configuration';

export interface MessageQueueStateModel {
    socketConnectionOpen: boolean;
    messageQueues: MessageQueue[];
}

const defaults: MessageQueueStateModel = {
    socketConnectionOpen: false,
    messageQueues: []
};

@State<MessageQueueStateModel>({
    name: 'messageQueue',
    defaults
})

export class MessageQueueState {
    constructor(private store: Store, private socketManager: WebSocketManagerService) { }

    @Action(UserStateActions.FetchUserSucceeded)
    connect({ dispatch }: StateContext<MessageQueueStateModel>, action: UserStateActions.FetchUserSucceeded) {
        this.socketManager.subscribeToChannel(new UserChannelConfiguration(
            action.user.id,
            () => dispatch(new MessageQueueStateActions.ConnectionEstablished()),
            (event: CloseEvent) => dispatch(new MessageQueueStateActions.ConnectionClosed(event)),
            (event: Event) => dispatch(new MessageQueueStateActions.ConnectionError(event)),
            (data) => dispatch(new MessageQueueStateActions.MessageReceived(data.subject))
        ));
    }

    @Action(MessageQueueStateActions.ConnectionEstablished)
    connectionOpened({ patchState }: StateContext<MessageQueueStateModel>) {
        patchState({
            socketConnectionOpen: true
        });
    }

    @Action(MessageQueueStateActions.ConnectionClosed)
    connectionClosed({ patchState }: StateContext<MessageQueueStateModel>) {
        patchState({
            socketConnectionOpen: false
        });
    }

    @Action(MessageQueueStateActions.MessageReceived)
    messageReceived({ getState, patchState, dispatch }: StateContext<MessageQueueStateModel>, action: MessageQueueStateActions.MessageReceived) {
        const userId = this.store.selectSnapshot(UserSelectors.getUserId);
        if (userId === action.message.user_id) {
            return;
        }

        const messageChatId = action.message.group_id || action.message.chat_id;

        const chats = this.store.selectSnapshot(SelectedChatsSelectors.getSelectedChats);
        let chatOpen: Boolean;

        for (let i = 0; i < chats.length; i++) {
            if (chats[i].type === 'GROUP' && chats[i].chat.id === messageChatId ||
                chats[i].type === 'DIRECT' && chats[i].chat.last_message.conversation_id === messageChatId) {
                chatOpen = true;
            }
        }

        // Only queue up message if chat is not open
        if (!chatOpen) {
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
            console.log(messageQueues);
        } else {
            asapScheduler.schedule(() => dispatch(new MessageQueueStateActions.MessageRecievedOpenChat(messageChatId)));
        }
    }

    @Action(SelectedChatsStateActions.FetchGroupChatSucceeded)
    clearGroupMessageQueue({ getState, patchState }: StateContext<MessageQueueStateModel>, action: SelectedChatsStateActions.FetchGroupChatSucceeded) {
        const messageQueues = getState().messageQueues;
        console.log(messageQueues);
        console.log(action);
        const selectedQueueIndex = messageQueues.findIndex(queue => queue.chatId === action.chatId);
        if (selectedQueueIndex >= 0) {
            console.log(selectedQueueIndex);
            console.log('here2');
            messageQueues.splice(selectedQueueIndex, 1);
            patchState({
                messageQueues: [...messageQueues]
            });
        }
        console.log(messageQueues);
    }

    @Action(SelectedChatsStateActions.FetchDirectChatSucceeded)
    clearDirectMessageQueue({ getState, patchState }: StateContext<MessageQueueStateModel>, action: SelectedChatsStateActions.FetchDirectChatSucceeded) {
        const messageQueues = getState().messageQueues;
        console.log(messageQueues);
        console.log(action);
        const selectedQueueIndex = messageQueues.findIndex(queue => queue.queue[0].user_id === action.chatId);
        if (selectedQueueIndex >= 0) {
            console.log(selectedQueueIndex);
            console.log('here');
            messageQueues.splice(selectedQueueIndex, 1);
            console.log(messageQueues);
            patchState({
                messageQueues: [...messageQueues]
            });
        }
        console.log(messageQueues);
    }
}
