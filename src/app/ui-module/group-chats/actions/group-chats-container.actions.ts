/**
 * Action alerting that the group chats container component has been initialized.
 */
export class Initialized {
    static readonly type = '[group chats container] initialized';
}

/**
 * Action alerting that the user has selected a group chat.
 */
export class GroupChatSelected {
    static readonly type = '[group chats container] group chat selected';
    /**
	 * @constructor
	 * @param groupChat the selected group chat
	 */
    constructor(public groupChat: any) { }
}
