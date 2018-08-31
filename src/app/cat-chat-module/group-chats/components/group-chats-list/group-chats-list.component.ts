import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'group-chats-list-component',
    templateUrl: './group-chats-list.component.html',
    styleUrls: ['./group-chats-list.component.css']
})
export class GroupChatsListComponent {
    @Input() groupChatsList: any[];
    @Input() selectedGroupChat: any;

    @Output() groupChatSelected: EventEmitter<string> = new EventEmitter<string>();
}
