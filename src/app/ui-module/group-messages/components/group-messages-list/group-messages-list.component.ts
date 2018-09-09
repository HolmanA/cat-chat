import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'group-messages-list-component',
    templateUrl: './group-messages-list.component.html',
    styleUrls: ['./group-messages-list.component.less']
})
export class GroupMessagesListComponent implements AfterViewInit {
    @ViewChild('scrollView') private scrollView: ElementRef;
    private _messageList: any[];
    private _selectedGroupChat: any;
    shouldScroll = true;

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
        try {
            this.scrollView.nativeElement.scrollTop = this.scrollView.nativeElement.scrollHeight;
        } catch (error) {
            console.error('scroll error', error);
        }
    }
}
