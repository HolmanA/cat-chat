import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/root-module/services/auth/auth.service';
import { BaseWebSocket } from './base-web-socket';
import { WebSocketConfiguration } from './models/web-socket-configuration';

@Injectable()
export class WebSocketManagerService {
    private sockets = {};

    constructor(private authService: AuthService) { }

    public subscribeToChannel(config: WebSocketConfiguration) {
        if (this.sockets[config.id]) {
            this.unsubscribeFromChannel(config.id);
        }

        const socket = new BaseWebSocket(config, this.authService.authToken);
        this.sockets[config.id] = socket;
    }

    public resubscribeToChannel(id: string) {
        const socket = this.sockets[id];
        if (!socket) {
            console.error(`WebSocket resubscription attempt failed; ${id} is not open`);
            return;
        }

        socket.close();
        socket.connect();
    }

    public unsubscribeFromChannel(id: string) {
        const socket = this.sockets[id];
        if (socket) {
            socket.close();
        }
        this.sockets[id] = null;
    }
}
