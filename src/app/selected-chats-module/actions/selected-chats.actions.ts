/**
 * Action alerting that a request to fetch group chats succeeded
 */
export class FetchGroupChatsSucceeded {
    static readonly type = '[selected chats state] fetch group chats succeeded';
}

/**
 * Action alerting that a request to fetch direct chats succeeded
 */
export class FetchDirectChatsSucceeded {
    static readonly type = '[selected chats state] fetch direct chats succeeded';
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
    static readonly type = '[selected chats state] fetch group chats failed';
    /**
	 * @constructor
	 * @param message the failure message
	 */
    constructor(public message: any) { }
}

/**
 * Action alerting that a request to fetch direct chats failed
 */
export class FetchDirectChatsFailed {
    static readonly type = '[selected chats state] fetch direct chats failed';
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
    static readonly type = '[selected chats state] fetch group chat succeeded';
    /**
	 * @constructor
	 * @param chatId the ID of the fetched chat
	 */
    constructor(public chatId: any) { }
}

/**
 * Action alerting that a request to fetch a direct chat succeeded
 */
export class FetchDirectChatSucceeded {
    static readonly type = '[selected chats state] fetch direct chat succeeded';
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
    static readonly type = '[selected chats state] fetch group chat failed';
    /**
	 * @constructor
	 * @param message the failure message
	 */
    constructor(public message: any) { }
}

/**
 * Action alerting that a request to fetch a group chat failed
 */
export class FetchDirectChatFailed {
    static readonly type = '[selected chats state] fetch direct chat failed';
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
    static readonly type = '[selected chats state] create message succeeded';
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
    static readonly type = '[selected chats state] create message failed';
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
    static readonly type = '[selected chats state] load more messages succeeded';
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
    static readonly type = '[selected chats state] load more messages failed';
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
    static readonly type = '[selected chats state] fetch newer messages succeeded';
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
    static readonly type = '[selected chats state] fetch newer messages failed';
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
    static readonly type = '[selected chats state] like message succeeded';
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
    static readonly type = '[selected chats state] like message failed';
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
    static readonly type = '[selected chats state] unlike message succeeded';
    /**
	 * @constructor
	 * @param chatId the chat ID
	 * @param messageId the message ID
	 */
    constructor(public chatId: string, public messageId: string) { }
}

/**
 * Action alerting that a request to unlike a message failed
 */
export class UnlikeMessageFailed {
    static readonly type = '[selected chats state] unlike message failed';
    /**
	 * @constructor
	 * @param message the failure message
	 */
    constructor(public message: any) { }
}

/**
 * Action alerting that the websocket connection has been established
 */
export class ChatChannelConnectionEstablished {
    static readonly type = '[selected chats state] chat channel connection established';
    /**
	 * @constructor
	 * @param chatId the chat ID
	 */
    constructor(public chatId: string) { }
}

/**
 * Action alerting that the websocket connection has been closed
 */
export class ChatChannelConnectionClosed {
    static readonly type = '[selected chats state] chat channel connection closed';
    /**
	 * @constructor
	 * @param chatId the chat ID
	 * @param message the failure message
	 */
    constructor(public chatId: string, public message?: any) { }
}

/**
 * Action alerting that an incoming message has been received
 */
export class ChatChannelMessageReceived {
    static readonly type = '[selected chats state] chat channel message received';
    /**
	 * @constructor
	 * @param chatId the chat ID
	 * @param message the incoming message
	 */
    constructor(public chatId: string, public message: any) { }
}

/**
 * Action alerting that a connection error has occured
 */
export class ChatChannelConnectionError {
    static readonly type = '[selected chats state] chat channel connection error';
    /**
	 * @constructor
	 * @param chatId the chat ID
	 * @param error the error message
	 */
    constructor(public chatId: string, public error?: any) { }
}

/**
 * Action alerting that an incoming message has been received
 */
export class ChatChannelLikeReceived {
    static readonly type = '[selected chats state] chat channel like received';
    /**
	 * @constructor
	 * @param chatId the chat ID
	 * @param message the incoming message
	 */
    constructor(public chatId: string, public message: any) { }
}
