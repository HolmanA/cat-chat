import { Component, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Inject } from '@angular/core';

@Component({
    selector: 'group-messages-list-item-component',
    templateUrl: './group-messages-list-item.component.html',
    styleUrls: ['./group-messages-list-item.component.less']
})
export class GroupMessagesListItemComponent {
    @Input() userId: string;
    @Input() members: string[];
    @Input() message: any;
    @Output() likeMessage: EventEmitter<any> = new EventEmitter<any>();
}
