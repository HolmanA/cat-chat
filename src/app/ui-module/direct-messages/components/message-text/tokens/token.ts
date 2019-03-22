import { HyperlinkToken } from './hyperlink-token';

export interface Token {
    readonly regex: RegExp;
    readonly replaceFn: Function;
}

// Contains a list of all static text tokens
export class TokenList {
    public static readonly TOKENS: Token[] = [
        new HyperlinkToken
    ];
}
