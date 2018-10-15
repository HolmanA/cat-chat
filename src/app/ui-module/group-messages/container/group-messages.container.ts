import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as Actions from '../actions/group-messages-container.actions';
import { GroupChatsSelectors } from '../../../group-chats-module/store/group-chats.selectors';
import { UserSelectors } from '../../../user-module/store/user.selectors';
import { SelectedChatsSelectors } from '../../../selected-chats-module/store/selected-chats.selectors';
import { SelectedChat } from '../../../selected-chats-module/store/models/selected-chat';

@Component({
    selector: 'group-messages-container',
    templateUrl: './group-messages.container.html'
})
export class GroupMessagesContainer implements OnInit {
    chatDetails$: Observable<any>;
    chatMessages$: Observable<any[]>;

    private _chatId: string;

    @Input()
    set chatId(chatId: string) {
        this._chatId = chatId;
        this.chatDetails$ = this.store.select(SelectedChatsSelectors.getSelectedChatDetails(chatId));
        this.chatMessages$ = this.store.select(SelectedChatsSelectors.getSelectedChatMessages(chatId));
        // @Select(SelectedChatsSelectors.getSelectedChatDetails(this.index)) chatDetails$: Observable<any>;
        // @Select(SelectedChatsSelectors.getSelectedChatMessages(this.index)) chatMessages$: Observable<any[]>;
    }

    get chatId(): string {
        return this._chatId;
    }

    @Select(UserSelectors.getUserId) userId$: Observable<string>;

    constructor(private store: Store) { }

    ngOnInit() {
        this.store.dispatch(new Actions.Initialized(this._chatId));
    }

    sendMessage(content: any) {
        this.store.dispatch(new Actions.SendMessage(this._chatId, content));
    }

    scrolledToTop() {
        this.store.dispatch(new Actions.ScrolledToTop(this._chatId));
    }
}
