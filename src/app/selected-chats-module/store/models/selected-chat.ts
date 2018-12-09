import { ChatType } from './chat-type';

export class SelectedChat {
    chat: any;
    type: ChatType;
    messages: any[];
    newMessage: any;
    socketConnectionOpen: boolean;
}
