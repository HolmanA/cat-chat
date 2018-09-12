/**
 * Action alerting that the group messages container component has been initialized.
 */
export class Initialized {
    static readonly type = '[group messages container] initialized';
}

/**
 * Action alerting that the use has requested to send a message
 */
export class SendMessage {
    static readonly type = '[group messages container] send message';
    /**
	 * @constructor
	 * @param content the message content
	 */
    constructor(public content: any) { }
}

/**
 * Action alerting that the user has scrolled to the top of the messages list.
 */
export class ScrolledToTop {
    static readonly type = '[group messages container] scrolled to top';
}
