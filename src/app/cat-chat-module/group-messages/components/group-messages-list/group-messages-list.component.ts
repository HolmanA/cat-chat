import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'group-messages-list-component',
    templateUrl: './group-messages-list.component.html',
    styleUrls: ['./group-messages-list.component.css']
})
export class GroupMessagesListComponent {
    @Input() selectedGroupChat: any;
    @Input() messageList: any[];
}
