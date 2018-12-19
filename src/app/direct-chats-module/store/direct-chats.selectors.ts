import { Selector } from '@ngxs/store';
import { DirectChatsStateModel, DirectChatsState } from './direct-chats.state';

/**
 * Selector class for @see DirectChatsState
 */
export class DirectChatsSelectors {
    /**
	 * Returns all direct chats
	 * @param state @see DirectChatsStateModel
	 */
    @Selector([DirectChatsState])
    static getDirectChats(state: DirectChatsStateModel) {
        return state.directChats;
    }
}
