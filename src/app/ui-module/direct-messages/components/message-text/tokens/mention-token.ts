import { Token } from './token';

/**
 * Dynamic token used to match and style mentions in a string
 */
export class MentionToken implements Token {
    regex: RegExp;
    replaceFn = (token) => `<span class="message-text-mention">${token}</span>`;

    constructor(private mention: string) {
        mention = mention.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        this.regex = new RegExp(`@${mention}`);
    }
}
