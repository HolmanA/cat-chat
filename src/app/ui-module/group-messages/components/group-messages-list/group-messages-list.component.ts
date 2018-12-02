import { Component, Input, ElementRef, AfterViewInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

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

    public newMessages = false;
    public scrolledToBottom = true;

    private _messagePageList: any[];
    private _scrolledToTop = false;

    constructor(
        private elementRef: ElementRef,
        private changeDetectorRef: ChangeDetectorRef
        ) { }

    ngAfterViewInit(): void {
        this.initializeScroll();
    }

    @Input()
    set messagePageList(list: any[]) {
        this._messagePageList = list;

        if (this.scrolledToBottom) {
            this.changeDetectorRef.detectChanges();
            this.scrollToBottom();
        } else if (this._scrolledToTop) {
            const message = document.getElementById(`chat-${this.chatId}-page-0-message-0`);

            // Scroll to previous top message when more messages are loaded
            if (message) {
                window.requestAnimationFrame(() => message.scrollIntoView(true));
            }
        } else {
            this.newMessages = true;
        }
    }

    get messagePageList(): any[] {
        return this._messagePageList;
    }

    public scrollToBottom(): void {
        try {
            this.elementRef.nativeElement.scrollTop = this.elementRef.nativeElement.scrollHeight;
            this.newMessages = false;
        } catch (error) {
            console.error('scroll error', error);
        }
    }

    private initializeScroll(): void {
        const nativeElement = this.elementRef.nativeElement;
        nativeElement.addEventListener('scroll', () => {
            const scrollTop = Math.floor(nativeElement.scrollTop);
            const maxScrollTop = nativeElement.scrollHeight - nativeElement.offsetHeight;

            this.scrolledToBottom = scrollTop === maxScrollTop;
            this._scrolledToTop = scrollTop === 0;

            if (this._scrolledToTop) {
                this.scrolledToTop.emit();
            } else if (this.scrolledToBottom) {
                this.newMessages = false;
            }
        });

        this.scrollToBottom();
    }
}
