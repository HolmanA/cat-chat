import { Action, StateContext, State, Selector } from "@ngxs/store";
import * as Actions from "../actions/user.actions";

export interface UserStateModel {
    user: any;
    loading: boolean;
}

const defaults: UserStateModel = {
    user: null,
    loading: false
}

@State<UserStateModel>({
    name: 'user',
    defaults
})

export class UserState {
    @Selector()
    static getName(state: UserStateModel) {
        return state.user['name'];
    }

    @Selector()
    static getId(state: UserStateModel) {
        return state.user['id'];
    }

    @Selector()
    static getPhoneNumber(state: UserStateModel) {
        return state.user['phone_number'];
    }

    @Selector()
    static getImageUrl(state: UserStateModel) {
        return state.user['image_url'];
    }

    @Selector()
    static getEmailAddress(state: UserStateModel) {
        return state.user['email'];
    }

    @Selector()
    static getLoading(state: UserStateModel) {
        return state.loading;
    }

    @Action(Actions.SetUser)
    setUser({ patchState }: StateContext<UserStateModel>, { payload }: Actions.SetUser) {
        patchState({ user: payload });
    }

    @Action(Actions.SetLoading)
    setLoading({ patchState }: StateContext<UserStateModel>, { payload }: Actions.SetLoading) {
        patchState({ loading: payload });
    }
}
