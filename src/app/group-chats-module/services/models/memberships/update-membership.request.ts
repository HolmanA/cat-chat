export class UpdateMembershipRequest {
    group_id: string;
    body: {
        membership: {
            nickname: string;
        }
    };
}
