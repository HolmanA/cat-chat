export class FetchMessagesRequest {
    group_id: string;
    before_id: string = '';
    since_id: string = '';
    after_id: string = '';
    limit: number = 10;
}