export interface WebSocketConfiguration {
    id: string;
    subscriptionPath: string;
    connEsteblishedFn: () => any;
    connClosedFn: (event: CloseEvent) => any;
    connErrorFn: (event: Event) => any;
    messageHandlerFn: (data: any) => any;
}
