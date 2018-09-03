import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';

@Component({
    selector: 'group-messages-list-component',
    templateUrl: './group-messages-list.component.html',
    styleUrls: ['./group-messages-list.component.less']
})
export class GroupMessagesListComponent implements AfterViewInit {
    @ViewChild('scrollView') private scrollView: ElementRef;
    @Input() messageList: any[];

    private _selectedGroupChat: any;
    
    shouldScroll: boolean = true;

    ngAfterViewInit(): void {
        this.scrollToBottom();
    }

    @Input()
    public set selectedGroupChat(selectedChat: any) {
        console.log('set selectedGroupChat');
        this._selectedGroupChat = selectedChat;
        if (this.shouldScroll) {
            this.scrollToBottom();
        }
    }

    public get selectedGroupChat(): any {
        console.log('get selectedGroupChat');
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
