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
}
