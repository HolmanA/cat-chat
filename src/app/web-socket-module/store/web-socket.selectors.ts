import { Selector, createSelector } from '@ngxs/store';
import { WebSocketState, WebSocketStateModel } from './web-socket.state';

/**
 * Selector class for @see WebSocketState
 */
export class WebSocketSelectors {
    static getMessageQueue(chatId: string) {
        return createSelector([WebSocketState], (state: WebSocketStateModel) => {
            return state.messageQueues.find(messageQueue => messageQueue.chatId === chatId);
        });
    }
    /**
     * Returns all new message queues
     * @param state @see WebSocketStateModel
     */
    @Selector([WebSocketState])
    static getMessageQueues(state: WebSocketStateModel) {
        return state.messageQueues;
    }
}
