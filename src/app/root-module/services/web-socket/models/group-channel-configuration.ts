import { WebSocketConfiguration } from './web-socket-configuration';

export class GroupChannelConfiguration implements WebSocketConfiguration {
    public subscriptionPath: string;
    public id: string;

    constructor(
        private groupId: string,
        public connEsteblishedFn: () => any,
        public connClosedFn: (event: CloseEvent) => any,
        public connErrorFn: (event: Event) => any,
        public messageHandlerFn: (data: any) => any,
    ) {
        this.id = groupId;
        this.subscriptionPath = '/group/' + this.groupId;
    }
}
