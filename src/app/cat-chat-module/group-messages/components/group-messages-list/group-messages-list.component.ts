import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';

@Component({
    selector: 'group-messages-list-component',
    templateUrl: './group-messages-list.component.html',
    styleUrls: ['./group-messages-list.component.less']
})
export class GroupMessagesListComponent {
    @ViewChild('scrollView') private scrollView: ElementRef;
    @Input() messageList: any[];
    @Input() selectedGroupChat: any;

    // ngAfterViewInit(): void {
    //     this.scrollToBottom();
    // }

    private scrollToBottom(): void {
        console.log('scroll to bottom');
        try {
            this.scrollView.nativeElement.scrollTop = this.scrollView.nativeElement.scrollHeight;
        } catch (error) {
            console.error('scroll error', error);
        }
    }
}
