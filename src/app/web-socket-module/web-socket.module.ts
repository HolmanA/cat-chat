import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { WebSocketService } from './services/web-socket.service';
import { WebSocketState } from './store/web-socket.state';

@NgModule({
  imports: [
      NgxsModule.forFeature([
        WebSocketState
    ])
  ],
  providers: [
    WebSocketService
  ]
})
export class WebSocketModule { }
