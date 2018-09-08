/**
 * Action alerting that a request to fetch the authenticated user's information succeeded
 */
export class FetchUserSucceeded {
	static readonly type = '[user state] fetch user succeeded';
}

/**
 * Action alerting that a request to fetch the authenticated user's information failed
 */
export class FetchUserFailed {
	static readonly type = '[user state] fetch user failed';
	/**
	 * @constructor
	 * @param message the failure message
	 */
	constructor(public message: any) { }
}

/**
 * Action alerting that a request to update the authenticated user's information succeeded
 */
export class UpdateUserSucceeded {
	static readonly type = '[user state] update user succeeded';
}

/**
 * Action alerting that a request to update the authenticated user's information failed
 */
export class UpdateUserFailed {
	static readonly type = '[user state] update user failed';
	/**
	 * @constructor
	 * @param message the failure message
	 */
	constructor(public message: any) { }
}
