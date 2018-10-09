import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as Actions from '../actions/group-messages-list-item-container.actions';
import { UserSelectors } from '../../../user-module/store/user.selectors';

@Component({
    selector: 'group-messages-list-item-container',
    templateUrl: './group-messages-list-item.container.html'
})
export class GroupMessagesListItemContainer implements OnInit {
    @Select(UserSelectors.getUserId) userId$: Observable<string>;
    @Input() message: any;
    @Input() chatId: string;

    userId: string;

    constructor(private store: Store) { }

    ngOnInit() {
        this.userId$.subscribe(id => this.userId = id);
    }

    likeMessage() {
        if (this.message.favorited_by.includes(this.userId)) {
            this.store.dispatch(new Actions.UnlikeMessage(this.chatId, this.message.id));
        } else {
            this.store.dispatch(new Actions.LikeMessage(this.chatId, this.message.id));
        }
    }
}
