import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { MessageQueueState } from './store/message-queue.state';

@NgModule({
  imports: [
    NgxsModule.forFeature([
      MessageQueueState
    ])
  ]
})
export class MessageQueueModule { }
