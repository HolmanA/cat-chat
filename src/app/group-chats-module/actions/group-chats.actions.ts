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

/**
 * Action alerting that a request to create a message succeeded
 */
export class CreateMessageSucceeded {
    static readonly type = '[group chats state] create message succeeded';
}

/**
 * Action alerting that a request to create a message failed
 */
export class CreateMessageFailed {
    static readonly type = '[group chats state] create message failed';
    /**
	 * @constructor
	 * @param message the failure message
	 */
    constructor(public message: any) { }
}

/**
 * Action alerting that a request to load more messages succeeded
 */
export class LoadMoreMessagesSucceeded {
    static readonly type = '[group chats state] load more messagessucceeded';
}

/**
 * Action alerting that a request to load more messages failed
 */
export class LoadMoreMessagesFailed {
    static readonly type = '[group chats state] load more messages failed';
    /**
	 * @constructor
	 * @param message the failure message
	 */
    constructor(public message: any) { }
}
