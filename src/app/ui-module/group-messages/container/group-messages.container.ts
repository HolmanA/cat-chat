import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as Actions from '../actions/group-messages-container.actions';
import { GroupChatsSelectors } from '../../../group-chats-module/store/group-chats.selectors';

@Component({
    selector: 'group-messages-container',
    templateUrl: './group-messages.container.html'
})
export class GroupMessagesContainer implements OnInit {
    @Select(GroupChatsSelectors.getSelectedChatDetails) selectedGroupChatDetails$: Observable<any>;
    @Select(GroupChatsSelectors.getSelectedChatMessages) selectedGroupChatMessages$: Observable<any[]>;

    constructor(private store: Store) { }

    ngOnInit() {
        this.store.dispatch(new Actions.Initialized());
    }

    sendMessage(content: any) {
        this.store.dispatch(new Actions.SendMessage(content));
    }

    scrolledToTop() {
        this.store.dispatch(new Actions.ScrolledToTop());
    }
}
