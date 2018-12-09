/**
 * Action alerting that the websocket connection has been established
 */
export class ConnectionEstablished {
    static readonly type = '[message queue state] connection established';
}

/**
 * Action alerting that the websocket connection has been closed
 */
export class ConnectionClosed {
    static readonly type = '[message queue state] connection closed';
    /**
	 * @constructor
	 * @param message the failure message
	 */
    constructor(public message?: any) { }
}

/**
 * Action alerting that an incoming message has been received
 */
export class MessageReceived {
    static readonly type = '[message queue state] message received';
    /**
	 * @constructor
	 * @param message the incoming message
	 */
    constructor(public message: any) { }
}

/**
 * Action alerting that a connection error has occured
 */
export class ConnectionError {
    static readonly type = '[message queue state] connection error';
    /**
	 * @constructor
	 * @param error the error message
	 */
    constructor(public error?: any) { }
}

export class MessageRecievedOpenChat {
    static readonly type = '[group chats state] message recieved in open chat';
    /**
	 * @constructor
	 * @param chatId the chat ID
	 */
    constructor(public chatId: any) { }
}
