/**
 * Action alerting that the use has requested to like a message
 */
export class LikeMessage {
    static readonly type = '[group messages list item container] like message';
    constructor(public chatId: string, public messageId: string) { }
}

/**
 * Action alerting that the use has requested to unlike a message
 */
export class UnlikeMessage {
    static readonly type = '[group messages list item container] unlike message';
    constructor(public chatId: string, public messageId: string) { }
}
