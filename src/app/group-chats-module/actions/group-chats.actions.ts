/**
 * Action alerting that a request to fetch group chats succeeded
 */
export class FetchGroupChatsSucceeded {
	static readonly type = '[group chats state] fetch group chats succeeded';
}

/**
 * Action alerting that a request to fetch group chats failed
 */
export class FetchGroupChatsFailed {
	static readonly type = '[group chats state] fetch group chats failed';
	/**
	 * @constructor
	 * @param message the failure message
	 */
	constructor(public message: any) { }
}

/**
 * Action alerting that a request to fetch a group chat succeeded
 */
export class FetchGroupChatSucceeded {
	static readonly type = '[group chats state] fetch group chat succeeded';
}

/**
 * Action alerting that a request to fetch a group chat failed
 */
export class FetchGroupChatFailed {
	static readonly type = '[group chats state] fetch group chat failed';
	/**
	 * @constructor
	 * @param message the failure message
	 */
	constructor(public message: any) { }
}
