import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as Actions from '../actions/group-chats-container.actions';
import { GroupChatsSelectors } from '../../../group-chats-module/store/group-chats.selectors';
import { WebSocketSelectors } from '../../../web-socket-module/store/web-socket.selectors';

@Component({
    selector: 'group-chats-container',
    templateUrl: './group-chats.container.html'
})
export class GroupChatsContainer implements OnInit {
    @Select(GroupChatsSelectors.getGroupChats) groupChats$: Observable<any>;
    @Select(GroupChatsSelectors.getSelectedChatDetails) selectedGroupChat$: Observable<any>;
    @Select(WebSocketSelectors.getMessageQueues) messageQueues$: Observable<any[]>;

    constructor(private store: Store) { }

    ngOnInit() {
        this.store.dispatch(new Actions.Initialized());
    }

    groupChatSelected(groupChat: string) {
        this.store.dispatch(new Actions.GroupChatSelected(groupChat));
    }
}
