import { WebSocketConfiguration } from './web-socket-configuration';

export class UserChannelConfiguration implements WebSocketConfiguration {
    public id: string;
    public subscriptionPath: string;

    constructor(
        public userId: string,
        public connEsteblishedFn: () => any,
        public connClosedFn: (event: CloseEvent) => any,
        public connErrorFn: (event: Event) => any,
        public messageHandlerFn: (data: any) => any,
    ) {
        this.id = userId;
        this.subscriptionPath = '/user/' + this.userId;
    }
}
