import { NgModule } from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import { SelectedChatsState } from './store/selected-chats.state';
import { GroupChatsModule } from '../group-chats-module/group-chats.module';
import { LikeMessageModule } from '../like-message-module/like-message.module';

@NgModule({
  imports: [
      GroupChatsModule,
      LikeMessageModule,
      NgxsModule.forFeature([
        SelectedChatsState
    ]),
  ]
})
export class SelectedChatsModule { }
