/**
 * Action alerting that the websocket connection has been established
 */
export class ConnectionEstablished {
	static readonly type = '[web socket service] connection established';
}

/**
 * Action alerting that the websocket connection has been closed
 */
export class ConnectionClosed {
	static readonly type = '[web socket service] connection closed';
	/**
	 * @constructor
	 * @param message the failure message
	 */
	constructor(public message?: any) {}
}

/**
 * Action alerting that an incoming message has been received
 */
export class MessageReceived {
	static readonly type = '[web socket service] message received';
	/**
	 * @constructor
	 * @param message the incoming message
	 */
	constructor(public message: any) {}
}

/**
 * Action alerting that a connection error has occured
 */
export class ConnectionError {
	static readonly type = '[web socket service] connection error';
	/**
	 * @constructor
	 * @param error the error message
	 */
	constructor(public error?: any) {}
}