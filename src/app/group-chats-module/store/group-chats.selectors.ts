import { Selector } from '@ngxs/store';
import { GroupChatsStateModel, GroupChatsState } from './group-chats.state';

/**
 * Selector class for @see GroupChatsState
 */
export class GroupChatsSelectors {
    /**
	 * Returns all group chats
	 * @param state @see GroupChatsStateModel
	 */
    @Selector([GroupChatsState])
    static getGroupChats(state: GroupChatsStateModel) {
        return state.groupChats;
    }

    /**
	 * Returns the currently selected group chat's details
	 * @param state @see GroupChatsStateModel
	 */
    @Selector([GroupChatsState])
    static getSelectedChatDetails(state: GroupChatsStateModel) {
        return state.selectedGroupChat.chat;
    }

    /**
     * Returns the currently selected group chat's ID
     * @param state @see GroupChatsStateModel
     */
    @Selector([GroupChatsState])
    static getSelectedChatId(state: GroupChatsStateModel) {
        return state.selectedGroupChat.chat.id;
    }

    /**
	 * Returns the currently selected group chat's messages
	 * @param state @see GroupChatsStateModel
	 */
    @Selector([GroupChatsState])
    static getSelectedChatMessages(state: GroupChatsStateModel) {
        return state.selectedGroupChat.messages;
    }
}
