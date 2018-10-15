import { Component, Input, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import * as Actions from '../actions/root-container.actions';
import { SelectedChatsSelectors } from '../../../selected-chats-module/store/selected-chats.selectors';
import { Observable } from 'rxjs';

@Component({
    selector: 'root-container',
    templateUrl: './root.container.html'
})
export class RootContainer implements OnInit {
    @Select(SelectedChatsSelectors.getSelectedChats) selectedChats$: Observable<any[]>;

    constructor(private store: Store) { }

    ngOnInit() {
        this.store.dispatch(new Actions.Initialized());
    }
}
