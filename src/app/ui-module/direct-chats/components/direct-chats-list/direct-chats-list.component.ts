    import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'direct-chats-list-component',
    templateUrl: './direct-chats-list.component.html',
    styleUrls: ['./direct-chats-list.component.less']
})
export class DirectChatsListComponent implements AfterViewInit {
    @ViewChild('scrollView') private scrollView: ElementRef;
    @Input() directChatsList: any[];
    @Input() selectedChats: any[];
    @Input() messageQueues: any[];

    @Output() directChatSelected: EventEmitter<string> = new EventEmitter<string>();

    ngAfterViewInit(): void {
        this.initializeScroll();
    }

    trimMessage(message: string): string {
        const maxLength = 100;
        return message.length > maxLength ? message.substring(0, maxLength).trim() + '...' : message;
    }

    getNewMessageCount(chatId: string): number {
        const messageQueue = this.messageQueues.find(queue => queue.chatId === chatId);
        return messageQueue ? messageQueue.queue.length : 0;
    }

    isSelected(chatId: string): boolean {
        return this.selectedChats.find(chat => chat.chat.other_user.id === chatId) !== undefined;
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
