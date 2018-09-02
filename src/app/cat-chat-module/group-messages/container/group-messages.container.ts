import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as Actions from '../actions/group-messages-container.actions';
import { GroupChatsSelectors } from '../../../group-chats-module/store/group-chats.selectors';

@Component({
    selector: 'group-messages-container',
    templateUrl: './group-messages.container.html'
})
export class GroupMessagesContainer implements OnInit, AfterViewChecked {
    @Select(GroupChatsSelectors.getSelectedGroupChat) selectedGroupChat$: Observable<any>;

    constructor(private store: Store) { }

    ngOnInit() {
        this.store.dispatch(new Actions.Initialized());
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    sendMessage(content: any) {
        this.store.dispatch(new Actions.SendMessage(content));
    }

    private scrollToBottom(): void {
        const element = document.scrollingElement || document.body;
        element.scrollTop = element.scrollHeight;
    }
}
