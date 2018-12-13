import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as Actions from '../actions/direct-chats-container.actions';
import { DirectChatsSelectors } from '../../../direct-chats-module/store/direct-chats.selectors';
import { MessageQueueSelectors } from '../../../message-queue-module/store/message-queue.selectors';
import { SelectedChatsSelectors } from '../../../selected-chats-module/store/selected-chats.selectors';

@Component({
    selector: 'direct-chats-container',
    templateUrl: './direct-chats.container.html'
})
export class DirectChatsContainer implements OnInit {
    @Select(DirectChatsSelectors.getDirectChats) directChats$: Observable<any>;
    @Select(SelectedChatsSelectors.getSelectedDirectChats) selectedChats$: Observable<any[]>;
    @Select(MessageQueueSelectors.getMessageQueues) messageQueues$: Observable<any[]>;

    constructor(private store: Store) { }

    ngOnInit() {
        this.store.dispatch(new Actions.Initialized());
    }

    directChatSelected(directChat: any) {
        this.store.dispatch(new Actions.DirectChatSelected(directChat));
    }
}
