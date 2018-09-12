import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'group-message-input-component',
    templateUrl: './group-message-input.component.html',
    styleUrls: ['./group-message-input.component.less']
})
export class GroupMessageInputComponent {
    @Output() sendMessage: EventEmitter<any> = new EventEmitter<any>();
    model: any = {
        text: ''
    };

    send() {
        if (this.model.text && this.model.text.length > 0) {
            this.sendMessage.emit(this.model);
        }
    }
}
