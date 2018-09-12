import { Action, StateContext, State } from '@ngxs/store';
import * as WebSocketServiceActions from '../actions/web-socket.actions';

export interface WebSocketStateModel {
    isOpen: boolean;
    messages: any[];
}

const defaults: WebSocketStateModel = {
    isOpen: false,
    messages: []
};

@State<WebSocketStateModel>({
    name: 'websocket',
    defaults
})

export class WebSocketState {
    @Action(WebSocketServiceActions.ConnectionEstablished)
    connectionOpened({ patchState }: StateContext<WebSocketStateModel>) {
        patchState({
            isOpen: true
        });
    }

    @Action(WebSocketServiceActions.ConnectionClosed)
    connectionClosed({ patchState }: StateContext<WebSocketStateModel>) {
        patchState({
            isOpen: false
        });
    }

    @Action(WebSocketServiceActions.MessageReceived)
    messageReceived({ getState, patchState }: StateContext<WebSocketStateModel>, action: WebSocketServiceActions.MessageReceived) {
        const messages = getState().messages;
        messages.push(action.message);
        patchState({
            messages: messages
        });
    }
}
