/**
 * Action alerting that the direct chats container component has been initialized.
 */
export class Initialized {
    static readonly type = '[direct chats container] initialized';
}

/**
 * Action alerting that the user has selected a direct chat.
 */
export class DirectChatSelected {
    static readonly type = '[direct chats container] direct chat selected';
    /**
	 * @constructor
	 * @param DirectChat the selected direct chat
	 */
    constructor(public directChat: any) { }
}
