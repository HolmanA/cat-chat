import { Selector, createSelector } from '@ngxs/store';
import { SelectedChatsState, SelectedChatsStateModel } from './selected-chats.state';
import { ChatType } from './models/chat-type';

/**
 * Selector class for @see GroupChatsState
 */
export class SelectedChatsSelectors {
    /**
	 * Returns all selected chats
	 * @param state @see GroupChatsStateModel
	 */
    @Selector([SelectedChatsState])
    static getSelectedChats(state: SelectedChatsStateModel) {
        return state.selectedChats;
    }

    /**
	 * Returns all selected group chats
	 * @param state @see GroupChatsStateModel
	 */
    @Selector([SelectedChatsState])
    static getSelectedGroupChats(state: SelectedChatsStateModel) {
        return state.selectedChats.filter(chat => chat.type === ChatType.GROUP);
    }

    /**
	 * Returns all selected direct chats
	 * @param state @see GroupChatsStateModel
	 */
    @Selector([SelectedChatsState])
    static getSelectedDirectChats(state: SelectedChatsStateModel) {
        return state.selectedChats.filter(chat => chat.type === ChatType.DIRECT);
    }

    /**
     * Returns the new message queue for the specified chat id
     * @param state @see WebSocketStateModel
     */
    static getSelectedChat(chatId: string) {
        return createSelector([SelectedChatsState], (state: SelectedChatsStateModel) => {
            const chat = state.selectedChats.find(c => c.chat.id === chatId);
            return chat;
        });
    }

    /**
     * Returns the new message queue for the specified chat id
     * @param state @see WebSocketStateModel
     */
    static getSelectedChatDetails(chatId: string) {
        return createSelector([SelectedChatsState], (state: SelectedChatsStateModel) => {
            const chat = state.selectedChats.find(c => c.chat.id === chatId);
            return chat ? chat.chat : null;
        });
    }

    /**
     * Returns the new message queue for the specified chat id
     * @param state @see WebSocketStateModel
     */
    static getSelectedChatMessages(chatId: string) {
        return createSelector([SelectedChatsState], (state: SelectedChatsStateModel) => {
            const chat = state.selectedChats.find(c => c.chat.id === chatId);
            return chat ? chat.messages : null;
        });
    }

    /**
     * Returns the new message queue for the specified chat id
     * @param state @see WebSocketStateModel
     */
    static getSelectedChatNewMessage(chatId: number) {
        return createSelector([SelectedChatsState], (state: SelectedChatsStateModel) => {
            const chat = state.selectedChats.find(c => c.chat.id === chatId);
            return chat ? chat.newMessage : null;
        });
    }
}
