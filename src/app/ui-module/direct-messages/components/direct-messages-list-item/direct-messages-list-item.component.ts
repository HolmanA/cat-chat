import { Component, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Inject } from '@angular/core';

@Component({
    selector: 'direct-messages-list-item-component',
    templateUrl: './direct-messages-list-item.component.html',
    styleUrls: ['./direct-messages-list-item.component.less']
})
export class DirectMessagesListItemComponent {
    @Input() userId: string;
    @Input() members: string[];
    @Input() message: any;
    @Output() likeMessage: EventEmitter<any> = new EventEmitter<any>();
    isHover = false;
}
