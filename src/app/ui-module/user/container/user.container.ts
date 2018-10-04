import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { UserSelectors } from '../../../user-module/store/user.selectors';
import { Observable } from 'rxjs';

@Component({
    selector: 'user-container',
    templateUrl: './user.container.html'
})
export class UserContainer {
    @Select(UserSelectors.getUser) user$: Observable<any>;
    constructor(private store: Store) { }
}
