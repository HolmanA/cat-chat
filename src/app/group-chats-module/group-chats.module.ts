import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { GroupChatsHttpService } from './services/group-chats.service';
import { GroupChatsState } from './store/group-chats.state';

@NgModule({
  imports: [
    HttpClientModule,
      NgxsModule.forFeature([
        GroupChatsState
    ]),
  ],
  providers: [
    GroupChatsHttpService
  ]
})
export class GroupChatsModule { }
