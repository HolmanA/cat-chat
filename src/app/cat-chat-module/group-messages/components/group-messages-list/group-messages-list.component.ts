import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';

@Component({
    selector: 'group-messages-list-component',
    templateUrl: './group-messages-list.component.html',
    styleUrls: ['./group-messages-list.component.less']
})
export class GroupMessagesListComponent {
    @ViewChild('scrollView') private scrollView: ElementRef;
    private _messageList: any[];
    private _selectedGroupChat: any;
    shouldScroll: boolean = true;

    ngAfterViewInit(): void {
        this.scrollToBottom();
    }

    @Input()
    set messageList(list: any[]) {
        this._messageList = list;
        this._messageList.reverse();
    }

    get messageList(): any[] {
        return this._messageList;
    }

    @Input()
    set selectedGroupChat(chat: any) {
        this._selectedGroupChat = chat;
        if (this.shouldScroll) {
            this.scrollToBottom();
        }
    }

    get selectedGroupChat(): any {
        return this._selectedGroupChat;
    }

    private scrollToBottom(): void {
        console.log('scroll to bottom');
        try {
            this.scrollView.nativeElement.scrollTop = this.scrollView.nativeElement.scrollHeight;
        } catch (error) {
            console.error('scroll error', error);
        }
    }
}
