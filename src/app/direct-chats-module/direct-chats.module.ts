import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { DirectChatsHttpService } from './services/direct-chats.service';
import { DirectChatsState } from './store/direct-chats.state';

@NgModule({
  imports: [
    HttpClientModule,
    NgxsModule.forFeature([
      DirectChatsState
    ]),
  ],
  providers: [
    DirectChatsHttpService
  ]
})
export class DirectChatsModule { }
