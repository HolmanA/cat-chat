import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'group-chats-list-component',
    templateUrl: './group-chats-list.component.html',
    styleUrls: ['./group-chats-list.component.less']
})
export class GroupChatsListComponent implements AfterViewInit {
    @ViewChild('scrollView') private scrollView: ElementRef;
    @Input() groupChatsList: any[];
    @Input() selectedChats: any[];
    @Input() messageQueues: any[];

    @Output() groupChatSelected: EventEmitter<any> = new EventEmitter<any>();

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
        return this.selectedChats.find(chat => chat.chat.id === chatId) !== undefined;
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
