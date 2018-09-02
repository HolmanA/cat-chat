export class FetchGroupsRequest {
    page: number = 1;
    perPage: number = 10;
    omit: string = ''; // Only value is 'memberships'
}