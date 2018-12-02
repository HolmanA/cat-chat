/**
 * Action alerting that a request to fetch group chats succeeded
 */
export class FetchGroupChatsSucceeded {
    static readonly type = '[group chats state] fetch group chats succeeded';
}

/**
 * Action alerting that a chat has been closed
 */
export class ChatClosed {
    static readonly type = '[selected chats state] chat closed';
    /**
	 * @constructor
	 * @param index the closed chat's index
	 */
    constructor(public index: number) { }
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
    /**
	 * @constructor
	 * @param chatId the ID of the fetched chat
	 */
    constructor(public chatId: any) { }
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
    /**
	 * @constructor
	 * @param chatId the chat ID
	 */
    constructor(public chatId: any) { }
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
    static readonly type = '[group chats state] load more messages succeeded';
    /**
	 * @constructor
	 * @param chatId the chat ID
	 */
    constructor(public chatId: any) { }
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

/**
 * Action alerting that a request to fetch newer messages succeeded
 */
export class FetchNewerMessagesSucceeded {
    static readonly type = '[group chats state] fetch newer messages succeeded';
    /**
	 * @constructor
	 * @param chatId the chat ID
	 */
    constructor(public chatId: any) { }
}

/**
 * Action alerting that a request to fetch newer messages failed
 */
export class FetchNewerMessagesFailed {
    static readonly type = '[group chats state] fetch newer messages failed';
    /**
	 * @constructor
	 * @param message the failure message
	 */
    constructor(public message: any) { }
}

/**
 * Action alerting that a request to like a message succeeded
 */
export class LikeMessageSucceeded {
    static readonly type = '[group chats state] like message succeeded';
    /**
	 * @constructor
	 * @param chatId the chat ID
	 */
    constructor(public chatId: any) { }
}

/**
 * Action alerting that a request to like a message failed
 */
export class LikeMessageFailed {
    static readonly type = '[group chats state] like message failed';
    /**
	 * @constructor
	 * @param message the failure message
	 */
    constructor(public message: any) { }
}

/**
 * Action alerting that a request to unlike a message succeeded
 */
export class UnlikeMessageSucceeded {
    static readonly type = '[group chats state] unlike message succeeded';
    /**
	 * @constructor
	 * @param chatId the chat ID
	 */
    constructor(public chatId: any) { }
}

/**
 * Action alerting that a request to unlike a message failed
 */
export class UnlikeMessageFailed {
    static readonly type = '[group chats state] unlike message failed';
    /**
	 * @constructor
	 * @param message the failure message
	 */
    constructor(public message: any) { }
}
