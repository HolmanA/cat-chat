import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'group-chats-list-component',
    templateUrl: './group-chats-list.component.html',
    styleUrls: ['./group-chats-list.component.less']
})
export class GroupChatsListComponent implements AfterViewInit {
    @ViewChild('scrollView') private scrollView: ElementRef;
    @Input() groupChatsList: any[];
    @Input() selectedGroupChat: any;

    @Output() groupChatSelected: EventEmitter<string> = new EventEmitter<string>();

    ngAfterViewInit(): void {
        this.initializeScroll();
    }

    trimMessage(message: string): string {
        const maxLength = 100;
        return message.length > maxLength ? message.substring(0, maxLength).trim() + '...' : message;
    }

    private initializeScroll(): void {
        this.scrollView.nativeElement.addEventListener('scroll', () => {
            const nativeElement = this.scrollView.nativeElement;

            if (nativeElement.scrollTop === 0) {
                // this.scrolledToTop.emit();
            }
        });
    }
}
