import { Selector, createSelector } from '@ngxs/store';
import { MessageQueueState, MessageQueueStateModel } from './message-queue.state';

/**
 * Selector class for @see MessageQueueState
 */
export class MessageQueueSelectors {
    /**
     * Returns the new message queue for the specified chat id
     * @param state @see MessageQueueStateModel
     */
    static getMessageQueue(chatId: string) {
        return createSelector([MessageQueueState], (state: MessageQueueStateModel) => {
            return state.messageQueues.find(messageQueue => messageQueue.chatId === chatId);
        });
    }

    /**
     * Returns all new message queues
     * @param state @see MessageQueueStateModel
     */
    @Selector([MessageQueueState])
    static getMessageQueues(state: MessageQueueStateModel) {
        return state.messageQueues;
    }
}
