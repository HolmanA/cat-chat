/**
 * Action alerting that a request to fetch direct chats succeeded
 */
export class FetchDirectChatsSucceeded {
    static readonly type = '[direct chats state] fetch direct chats succeeded';
}

/**
 * Action alerting that a request to fetch direct chats failed
 */
export class FetchDirectChatsFailed {
    static readonly type = '[group chats state] fetch direct chats failed';
    /**
	 * @constructor
	 * @param message the failure message
	 */
    constructor(public message: any) { }
}

