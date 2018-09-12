export class FetchMessagesRequest {
    group_id: string;
    before_id = '';
    since_id = '';
    after_id = '';
    limit = 10;
}
