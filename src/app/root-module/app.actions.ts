export class Launched {
    static readonly type = '[app] launched';
    constructor(public authToken: string) {}
}