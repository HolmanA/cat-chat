export class UpdateGroupRequest {
    id: string;
    body: {
        name?: string;
        description?: string;
        image_url?: string;
        office_mode?: boolean;
        share?: boolean;
    }
}