export class AddMembersRequest {
    group_id: string;
    body: {
        members: [{
            nickname: string;
            user_id?: string;
            phone_number?: string;
            email?: string;
            guid?: string;
        }];
    };
}
