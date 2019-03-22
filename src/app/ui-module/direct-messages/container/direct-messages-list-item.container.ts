import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as Actions from '../actions/direct-messages-list-item-container.actions';
import { UserSelectors } from '../../../user-module/store/user.selectors';
import { SelectedChatsSelectors } from '../../../selected-chats-module/store/selected-chats.selectors';

@Component({
    selector: 'direct-messages-list-item-container',
    templateUrl: './direct-messages-list-item.container.html'
})
export class DirectMessagesListItemContainer implements OnInit {
    @Select(UserSelectors.getUserId) userId$: Observable<string>;
    @Input() message: any;

    chatMembers$: Observable<string[]>;
    userId: string;
    private _other_user_id: string;

    constructor(private store: Store) { }

    @Input()
    set other_user_id(id: string) {
        this._other_user_id = id;
        this.chatMembers$ = this.store.select(SelectedChatsSelectors.getSelectedChatMemberNicknames(id));
    }

    ngOnInit() {
        this.userId$.subscribe(id => this.userId = id);
    }

    likeMessage() {
        if (this.message.favorited_by.includes(this.userId)) {
            this.store.dispatch(new Actions.UnlikeMessage(this._other_user_id, this.message.id));
        } else {
            this.store.dispatch(new Actions.LikeMessage(this._other_user_id, this.message.id));
        }
    }
}
