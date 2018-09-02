import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, OnInit, AfterViewChecked } from '@angular/core';

@Component({
    selector: 'group-messages-list-component',
    templateUrl: './group-messages-list.component.html',
    styleUrls: ['./group-messages-list.component.less']
})
export class GroupMessagesListComponent implements OnInit, AfterViewChecked {
    @ViewChild('scrollView') private scrollView: ElementRef;
    @Input() selectedGroupChat: any;
    @Input() messageList: any[];

    ngOnInit(): void {
        this.scrollToBottom();
    }

    ngAfterViewChecked(): void {
        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        try {
            this.scrollView.nativeElement.scrollTop = this.scrollView.nativeElement.scrollHeight;
        } catch (error) {
            console.error('scroll error', error);
        }
    }
}
