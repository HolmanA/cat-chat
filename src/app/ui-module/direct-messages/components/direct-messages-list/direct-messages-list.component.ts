import { Component, Input, ElementRef, AfterViewInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'direct-messages-list-component',
    templateUrl: './direct-messages-list.component.html',
    styleUrls: ['./direct-messages-list.component.less']
})
export class DirectMessagesListComponent implements AfterViewInit {
    @Input() userId: string;
    @Input() other_user_id: string;
    @Input() selectedDirectChat: any;
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
        console.log('direct messages');
        console.log(list);
        this._messagePageList = Array(list[0].direct_messages.reverse());
        if (this.scrolledToBottom) {
            this.changeDetectorRef.detectChanges();
            this.scrollToBottom();
        } else if (this._scrolledToTop) {
            const message = document.getElementById(`chat-${this.other_user_id}-page-0-message-0`);

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
