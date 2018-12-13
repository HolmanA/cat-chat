export class CreateDirectChatRequest {
    body: {
        message: {
            source_guid: string;
            recipient_id: string;
            text: string;
            attachments?: [{
                type: string;
                url?: string; // type = 'image'
                lat?: string; // type = 'location'
                lng?: string; // type = 'location'
                name?: string; // type = 'location'
                placeholder?: string; // type = 'emoji'
                charmap?: any; // type = 'emoji'
            }]
        }
    };
}
