import { Selector } from '@ngxs/store';
import { UserState, UserStateModel } from './user.state';

/**
 * Selector class for @see UserState
 */
export class UserSelectors {
    /**
	 * Returns user's information
	 * @param state @see UserStateModel
	 */
    @Selector([UserState])
    static getUser(state: UserStateModel) {
        return state.user;
    }

    /**
	 * Returns user's id
	 * @param state @see UserStateModel
	 */
    @Selector([UserState])
    static getUserId(state: UserStateModel) {
        return state.user.id;
    }
}
