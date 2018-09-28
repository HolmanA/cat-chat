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

    private initializeScroll(): void {
        this.scrollView.nativeElement.addEventListener('scroll', () => {
            const nativeElement = this.scrollView.nativeElement;

            if (nativeElement.scrollTop === 0) {
                // this.scrolledToTop.emit();
            }
        });
    }

    public trimMessage(message: string): string {
        if (message.length > 50) {
            return message.substring(0,49).trim() + '...';
        } else {
            return message
        }
    }
}
