import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootContainer } from './root/container/root.container';
import { RootComponent } from './root/component/root.component';
import { GroupChatsModule } from '../group-chats-module/group-chats.module';
import { GroupChatsListComponent } from './group-chats/components/group-chats-list/group-chats-list.component';
import { GroupChatsContainer } from './group-chats/container/group-chats.container';
import { MessageListComponent } from './group-chats/components/message-list/message-list.component';

@NgModule({
  declarations: [
    GroupChatsListComponent,
    MessageListComponent,
    GroupChatsContainer,
    RootComponent,
    RootContainer
  ],
  imports: [
    CommonModule,
    GroupChatsModule
  ],
  exports: [
    RootContainer
  ]
})
export class CatChatModule { }
