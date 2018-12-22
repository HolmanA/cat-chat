import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as Actions from '../actions/direct-messages-container.actions';
import { DirectChatsSelectors } from '../../../direct-chats-module/store/direct-chats.selectors';
import { UserSelectors } from '../../../user-module/store/user.selectors';
import { SelectedChatsSelectors } from '../../../selected-chats-module/store/selected-chats.selectors';
import { SelectedChat } from '../../../selected-chats-module/store/models/selected-chat';

@Component({
    selector: 'direct-messages-container',
    templateUrl: './direct-messages.container.html'
})
export class DirectMessagesContainer implements OnInit {
    chatDetails$: Observable<any>;
    chatMessages$: Observable<any[]>;

    private _other_user_id: string;

    @Input()
    set other_user_id(other_user_id: string) {
        this._other_user_id = other_user_id;
        this.chatDetails$ = this.store.select(SelectedChatsSelectors.getSelectedChatDetails(other_user_id));
        this.chatMessages$ = this.store.select(SelectedChatsSelectors.getSelectedChatMessages(other_user_id));
        // @Select(SelectedChatsSelectors.getSelectedChatDetails(this.index)) chatDetails$: Observable<any>;
        // @Select(SelectedChatsSelectors.getSelectedChatMessages(this.index)) chatMessages$: Observable<any[]>;
    }

    get other_user_id(): string {
        return this._other_user_id;
    }

    @Select(UserSelectors.getUserId) userId$: Observable<string>;

    constructor(private store: Store) { }

    ngOnInit() {
        this.store.dispatch(new Actions.Initialized(this._other_user_id));
    }

    sendMessage(content: any) {
        this.store.dispatch(new Actions.SendMessage(this._other_user_id, content));
    }

    scrolledToTop() {
        this.store.dispatch(new Actions.ScrolledToTop(this._other_user_id));
    }
}
