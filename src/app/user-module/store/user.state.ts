import { Action, StateContext, State } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { asapScheduler, of } from 'rxjs';
import { UserHttpService } from '../services/user.service';
import * as AppComponentActions from '../../root-module/actions/app.actions';
import * as UserStateActions from '../actions/user.actions';

export interface UserStateModel {
    user: any;
}

const defaults: UserStateModel = {
    user: null
};

@State<UserStateModel>({
    name: 'user',
    defaults
})

export class UserState {
    constructor(private userService: UserHttpService) { }

    @Action(AppComponentActions.Initialized)
    fetchUser({ patchState, dispatch }: StateContext<UserStateModel>) {
        return this.userService.fetchUser().pipe(
            tap(user => {
                patchState({
                    user: user
                });
                asapScheduler.schedule(() => dispatch(new UserStateActions.FetchUserSucceeded(user)));
            }),
            catchError(error => {
                return of(asapScheduler.schedule(() => dispatch(new UserStateActions.FetchUserFailed(error))));
            })
        );
    }
}
