import { Component, Input, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'group-messages-list-component',
    templateUrl: './group-messages-list.component.html',
    styleUrls: ['./group-messages-list.component.less']
})
export class GroupMessagesListComponent implements AfterViewInit {
    @Input() userId: string;
    @Input() chatId: string;
    @Input() selectedGroupChat: any;
    @Output() scrolledToTop: EventEmitter<any> = new EventEmitter<any>();

    private _messagePageList: any[];

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        this.initializeScroll();
    }

    @Input()
    set messagePageList(list: any[]) {
        this._messagePageList = list;
        const message = document.getElementById(`chat-${this.chatId}-page-0-message-0`);

        if (message) {
            window.requestAnimationFrame(() => message.scrollIntoView(true));
        }
    }

    get messagePageList(): any[] {
        return this._messagePageList;
    }

    private initializeScroll(): void {
        this.elementRef.nativeElement.addEventListener('scroll', () => {
            if (this.elementRef.nativeElement.scrollTop === 0) {
                this.scrolledToTop.emit();
            }
        });

        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        try {
            this.elementRef.nativeElement.scrollTop = this.elementRef.nativeElement.scrollHeight;
        } catch (error) {
            console.error('scroll error', error);
        }
    }
}
