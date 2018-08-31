export class SetUser {
    static readonly type = '[user] set user';
    constructor(public payload: any) { }
}

export class SetLoading {
    static readonly type = '[user] set loading';
    constructor(public payload: boolean) { }
}