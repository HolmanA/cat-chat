import { WebSocketConfiguration } from './models/web-socket-configuration';

/**
 * Service used to connect to GroupMe's push-message websocket
 * Runs on its own and interacts with other components through selectors and actions
 */
export class BaseWebSocket {
    private readonly TIMEOUT_MILLIS = 120000; // 2 min
    private timeout;
    private webSocket: WebSocket;
    private messageId = 1;

    constructor(
        private config: WebSocketConfiguration,
        private authToken: string
    ) {
        this.connect();
    }

    public connect() {
        if (!this.config.subscriptionPath) {
            console.error('Subscription path required for a web-socket connection.');
            return;
        }

        this.webSocket = new WebSocket('wss://push.groupme.com/faye');

        // Send handshake once connection is establlished
        this.webSocket.onopen = () => {
            if (this.isConnected()) {
                this.sendHandshake();
            }
        };

        this.webSocket.onclose = this.config.connClosedFn;
        this.webSocket.onerror = this.config.connErrorFn;
    }

    public close() {
        this.webSocket.close();
    }

    /**
     * Checks if the connections status is OPEN
     */
    public isConnected(): boolean {
        return this.webSocket.readyState === this.webSocket.OPEN;
    }

    /**
     * Sends a message to the connection
     * @param message JSON object message
     */
    private send(message: any): void {
        this.webSocket.send(JSON.stringify(message));
    }

    /**
     * Sends a handshake message to the websocket connection
     * Sets @see sendHandshakeResponseHandler as the websocket message handler function
     */
    private sendHandshake(): void {
        this.webSocket.onmessage = (message) => this.sendHandshakeResponseHandler(message);
        this.send([{
            channel: '/meta/handshake',
            version: 1.0,
            supportedConnectionTypes: ['websocket'],
            id: this.messageId
        }]);
    }

    /**
     * Handles incoming handshake response
     * @param message The response message to @see sendHandshake
     */
    private sendHandshakeResponseHandler(message: MessageEvent): void {
        const data = JSON.parse(message.data)[0];
        if (data.id === this.messageId && data.successful) {
            this.messageId++;
            // Successfully executed handshake, subscribe to new message channel
            const clientId = data.clientId;
            this.sendSubscribe(clientId);
        }
    }

    /**
     * Sends a user subscription message to the websocket connection
     * Sets @see sendSubscribeResponseHandler as the websocket message handler function
     * @param clientId The client id received in response to this connection's handshake message
     */
    private sendSubscribe(clientId: string): void {
        this.webSocket.onmessage = (message) => this.sendSubscribeResponseHandler(message);
        this.send([{
            channel: '/meta/subscribe',
            clientId: clientId,
            subscription: this.config.subscriptionPath,
            id: this.messageId,
            ext: {
                access_token: this.authToken,
                timestamp: Date.now()
            }
        }]);
    }

    /**
     * Handles incoming subscription response
     * @param message The response message to @see sendSubscribe
     */
    private sendSubscribeResponseHandler(message: MessageEvent): void {
        this.refreshTimeout();

        const data = JSON.parse(message.data)[0];
        if (data.id === this.messageId && data.successful) {
            this.messageId++;
            // Successfully connected to groupme websocket, set message handler to default
            this.webSocket.onmessage = (messageEvent) => this.messageHandler(messageEvent);
            this.config.connEsteblishedFn();
        }
    }

    /**
     * Default message handler
     * @param message Incoming message
     */
    private messageHandler(messageEvent: MessageEvent): void {
        this.refreshTimeout();

        const data = JSON.parse(messageEvent.data)[0].data;
        if (data.type === 'ping') {
            return;
        } else if (data) {
            this.config.messageHandlerFn(data);
        }
    }

    private refreshTimeout() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.close();
            this.connect();
        }, this.TIMEOUT_MILLIS);
    }
}
