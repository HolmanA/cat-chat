import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as Actions from '../actions/group-messages-list-item-container.actions';
import { UserSelectors } from '../../../user-module/store/user.selectors';
import { SelectedChatsSelectors } from '../../../selected-chats-module/store/selected-chats.selectors';

@Component({
    selector: 'group-messages-list-item-container',
    templateUrl: './group-messages-list-item.container.html'
})
export class GroupMessagesListItemContainer implements OnInit {
    @Select(UserSelectors.getUserId) userId$: Observable<string>;
    @Input() message: any;

    chatMembers$: Observable<string[]>;
    userId: string;
    private _chatId: string;

    constructor(private store: Store) { }

    @Input()
    set chatId(id: string) {
        this._chatId = id;
        this.chatMembers$ = this.store.select(SelectedChatsSelectors.getSelectedChatMemberNicknames(id));
    }

    ngOnInit() {
        this.userId$.subscribe(id => this.userId = id);
    }

    likeMessage() {
        if (this.message.favorited_by.includes(this.userId)) {
            this.store.dispatch(new Actions.UnlikeMessage(this._chatId, this.message.id));
        } else {
            this.store.dispatch(new Actions.LikeMessage(this._chatId, this.message.id));
        }
    }
}
