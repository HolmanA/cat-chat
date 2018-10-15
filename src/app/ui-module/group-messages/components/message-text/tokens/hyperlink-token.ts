import { Token } from './token';
export class HyperlinkToken implements Token {
    regex = /((https?:\/\/)|(www\.))[^\s]+/g;
    replaceFn = (token) => `<a href="${token}" class="message-text-hyperlink">${token}</a>`;
}
