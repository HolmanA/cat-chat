export class FetchGroupChatsSucceeded {
	static readonly type = '[group chats state] fetch group chats succeeded';
	constructor(public groups: any) { }
}

export class FetchGroupChatsFailed {
	static readonly type = '[group chats state] fetch group chats failed';
	constructor(public message: any) { }
}

export class FetchGroupChatSucceeded {
	static readonly type = '[group chats state] fetch group chat succeeded';
}

export class FetchGroupChatFailed {
	static readonly type = '[group chats state] fetch group chat failed';
	constructor(public message: any) { }
}
