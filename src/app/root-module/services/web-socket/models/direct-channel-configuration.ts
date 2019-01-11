import { WebSocketConfiguration } from './web-socket-configuration';

export class DirectChannelConfiguration implements WebSocketConfiguration {
    public subscriptionPath: string;
    public id: string;

    constructor(
        private other_user_id: string,
        private channelId: string,
        public connEsteblishedFn: () => any,
        public connClosedFn: (event: CloseEvent) => any,
        public connErrorFn: (event: Event) => any,
        public messageHandlerFn: (data: any) => any,
    ) {
        this.id = other_user_id;
        this.subscriptionPath = '/direct_message/' + this.channelId;
    }
}
