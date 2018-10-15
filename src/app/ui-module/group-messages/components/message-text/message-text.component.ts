import { Component, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Inject, Renderer } from '@angular/core';
import { Token, TokenList } from './tokens/token';
import { MentionToken } from './tokens/mention-token';

@Component({
    selector: 'message-text-component',
    templateUrl: './message-text.component.html',
    styleUrls: ['./message-text.component.less']
})
export class MessageTextComponent implements AfterViewInit {
    private tokenList = [...TokenList.TOKENS];
    private _members: string[];
    private _messageText: string;
    constructor(private elementRef: ElementRef, private renderer: Renderer) { }

    @Input()
    set members(members: string[]) {
        this._members = members;
        for (const member of this._members) {
            this.tokenList.push(new MentionToken(member));
        }
    }

    @Input()
    set rawMessage(rawMessage: string) {
        this._messageText = rawMessage || '';
    }

    ngAfterViewInit() {
        this.formatMessage();
    }

    private formatMessage() {
        for (const token of this.tokenList) {
            this._messageText = this._messageText.replace(token.regex, (match) => token.replaceFn(match));
        }
        this.renderer.setElementProperty(this.elementRef.nativeElement, 'innerHTML', this._messageText);
    }
}
