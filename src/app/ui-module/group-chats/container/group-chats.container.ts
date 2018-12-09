import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as Actions from '../actions/group-chats-container.actions';
import { GroupChatsSelectors } from '../../../group-chats-module/store/group-chats.selectors';
import { MessageQueueSelectors } from '../../../message-queue-module/store/message-queue.selectors';
import { SelectedChatsSelectors } from '../../../selected-chats-module/store/selected-chats.selectors';

@Component({
    selector: 'group-chats-container',
    templateUrl: './group-chats.container.html'
})
export class GroupChatsContainer implements OnInit {
    @Select(GroupChatsSelectors.getGroupChats) groupChats$: Observable<any>;
    @Select(SelectedChatsSelectors.getSelectedGroupChats) selectedChats$: Observable<any[]>;
    @Select(MessageQueueSelectors.getMessageQueues) messageQueues$: Observable<any[]>;

    constructor(private store: Store) { }

    ngOnInit() {
        this.store.dispatch(new Actions.Initialized());
    }

    groupChatSelected(groupChat: any) {
        this.store.dispatch(new Actions.GroupChatSelected(groupChat));
    }
}
