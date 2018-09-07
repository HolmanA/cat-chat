import { Injectable } from '@angular/core';
import { AuthService } from '../../root-module/services/auth/auth.service';
import { Store, Select } from '@ngxs/store';
import * as Actions from '../actions/web-socket.actions';
import { UserSelectors } from '../../user-module/store/user.selectors';
import { Observable } from 'rxjs';

/**
 * Service used to connect to GroupMe's push-message websocket 
 * Runs on its own and interacts with other components through selectors and actions
 */
@Injectable()
export class WebSocketService {
    @Select(UserSelectors.getUserId) userId$: Observable<string>;
    private websocket: WebSocket;
    private userId: string;

    constructor(
        private store: Store,
        private authService: AuthService
    ) { 
        // Reconnect to the websocket service if the user id is changed
        this.userId$.subscribe(id => {
            this.userId = id;
            this.restart();
        });
    }

    /**
     * Re-initiate the connection
     */
    private restart(): void { 
        this.websocket = new WebSocket('wss://push.groupme.com/faye');

        // Send handshake once connection is establlished
        this.websocket.onopen = () => {
            if (this.isConnected()) {
                this.sendHandshake();
            }
        };

        this.websocket.onclose = (message) => {
            this.store.dispatch(new Actions.ConnectionClosed(message));
        };

        this.websocket.onerror = (error) => {
            this.store.dispatch(new Actions.ConnectionError(error));
        };
    }

    /**
     * Sends a message to the connection
     * @param message JSON object message
     */
    private send(message: any): void {
        this.websocket.send(JSON.stringify(message));
    }

    /**
     * Checks if the connections status is OPEN
     */
    private isConnected(): boolean {
        return this.websocket.readyState === this.websocket.OPEN;
    }

    /**
     * Sends a handshake message to the websocket connection
     * Sets @see sendHandshakeResponseHandler as the websocket message handler function
     */
    private sendHandshake(): void {
        this.websocket.onmessage = (message) => this.sendHandshakeResponseHandler(message);
        this.send([{
            channel: '/meta/handshake',
            version: 1.0,
            supportedConnectionTypes: ['websocket'],
            id: 1
        }]);
    }

    /**
     * Handles incoming handshake response
     * @param message The response message to @see sendHandshake
     */
    private sendHandshakeResponseHandler(message: any): void {
        const data = JSON.parse(message.data)[0];
        if (data.id === 1 && data.successful) {
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
        this.websocket.onmessage = (message) => this.sendSubscribeResponseHandler(message);
        this.send([{
            channel: '/meta/subscribe',
            clientId: clientId,
            subscription: `/user/${this.userId}`,
            id: 2,
            ext: {
                access_token: this.authService.authToken,
                timestamp: Date.now()
            }
        }]);
    }

    /**
     * Handles incoming subscription response 
     * @param message The response message to @see sendSubscribe
     */
    private sendSubscribeResponseHandler(message: any): void {
        const data = JSON.parse(message.data)[0];
        if (data.id === 2 && data.successful) {
            // Successfully connected to groupme websocket, set message handler to default
            this.websocket.onmessage = (message) => this.messageHandler(message);
        }
    }

    /**
     * Default message handler
     * @param message Incoming message
     */
    private messageHandler(message: any): void {
        const data = JSON.parse(message.data)[0];
        this.store.dispatch(new Actions.MessageReceived(data));
    }
}