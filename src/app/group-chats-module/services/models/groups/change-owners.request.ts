export class ChangeOwnersRequest {
    // This is a weird GroupMe standard...
    body: {
        requests: [{
            group_id: string;
            owner_id: string;
        }]
    };
}
