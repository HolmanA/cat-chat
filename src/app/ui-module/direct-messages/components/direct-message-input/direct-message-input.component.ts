import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'direct-message-input-component',
    templateUrl: './direct-message-input.component.html',
    styleUrls: ['./direct-message-input.component.less']
})
export class DirectMessageInputComponent {
    @Output() sendMessage: EventEmitter<any> = new EventEmitter<any>();
    model: any = {
        text: ''
    };

    send() {
        if (this.model.text && this.model.text.length > 0) {
            this.sendMessage.emit(this.model);
        }
        this.model.text = '';
    }
}
