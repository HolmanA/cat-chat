export class Initialized {
	static readonly type = '[group chats container] initialized';
}

export class GroupChatSelected {
	static readonly type = '[group chats container] group chat selected';
	constructor(public groupChat: any) { }
}