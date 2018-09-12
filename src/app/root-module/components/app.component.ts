import { Component, Inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngxs/store';
import * as Actions from '../actions/app.actions';
import { AuthService } from '../services/auth/auth.service';
import { WebSocketService } from '../../web-socket-module/services/web-socket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
    constructor(
        @Inject(DOCUMENT)
        private document: Document,
        private authService: AuthService,
        private webSocketService: WebSocketService, // Do Not Delete: This is needed to initialize the websocket service with the di system
        private store: Store
    ) {
        const token = environment.authToken || document.getElementById('authentication-token').innerText;
        this.authService.authToken = token;
    }

    ngOnInit(): void {
        this.store.dispatch(new Actions.Initialized());
    }
}
