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
    @Input() messageQueues: any[];

    @Output() groupChatSelected: EventEmitter<string> = new EventEmitter<string>();

    ngAfterViewInit(): void {
        this.initializeScroll();
    }

    trimMessage(message: string): string {
        const maxLength = 100;
        return message.length > maxLength ? message.substring(0, maxLength).trim() + '...' : message;
    }

    newMessageCount(chatId: string): number {
        const messageQueue = this.messageQueues.find(queue => queue.chatId === chatId);
        console.log('message sizes', this.messageQueues);
        console.log('message queue', messageQueue);
        return messageQueue ? messageQueue.queue.length : 0;
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
