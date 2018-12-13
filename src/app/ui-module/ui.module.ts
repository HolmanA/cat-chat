import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootContainer } from './root/container/root.container';
import { RootComponent } from './root/component/root.component';
import { GroupChatsModule } from '../group-chats-module/group-chats.module';
import { GroupChatsListComponent } from './group-chats/components/group-chats-list/group-chats-list.component';
import { GroupChatsContainer } from './group-chats/container/group-chats.container';
import { GroupMessagesContainer } from './group-messages/container/group-messages.container';
import { GroupMessagesListComponent } from './group-messages/components/group-messages-list/group-messages-list.component';
import { GroupMessageInputComponent } from './group-messages/components/group-message-input/group-message-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupMessagesListItemComponent } from './group-messages/components/group-messages-list-item/group-messages-list-item.component';
import { GroupMessagesListItemContainer } from './group-messages/container/group-messages-list-item.container';
import { UserComponent } from './user/components/user/user.component';
import { UserContainer } from './user/container/user.container';
import { UserModule } from '../user-module/user.module';
import { UserDetailsComponent } from './user/components/user-details/user-details.component';
import { SelectedChatsModule } from '../selected-chats-module/selected-chats.module';
import { MessageTextComponent } from './group-messages/components/message-text/message-text.component';
import { DirectChatsListComponent } from './direct-chats/components/direct-chats-list/direct-chats-list.component';
import { DirectChatsContainer } from './direct-chats/container/direct-chats.container';
import { DirectChatsModule } from '../direct-chats-module/direct-chats.module';
import { DirectMessageInputComponent } from './direct-messages/components/direct-message-input/direct-message-input.component';
import { DirectMessagesListComponent } from './direct-messages/components/direct-messages-list/direct-messages-list.component';
import { DirectMessagesListItemComponent } from './direct-messages/components/direct-messages-list-item/direct-messages-list-item.component';
import { DirectMessagesListItemContainer } from './direct-messages/container/direct-messages-list-item.container';
import { DirectMessagesContainer } from './direct-messages/container/direct-messages.container';
import { DirectMessageTextComponent } from './direct-messages/components/message-text/direct-message-text.component';

@NgModule({
  declarations: [
    GroupChatsListComponent,
    GroupChatsContainer,
    GroupMessagesListComponent,
    GroupMessagesListItemComponent,
    GroupMessagesListItemContainer,
    GroupMessageInputComponent,
    GroupMessagesContainer,
    DirectChatsListComponent,
    DirectChatsContainer,
    DirectMessageInputComponent,
    DirectMessagesListComponent,
    DirectMessagesListItemComponent,
    DirectMessagesListItemContainer,
    DirectMessagesContainer,
    MessageTextComponent,
    DirectMessageTextComponent,
    UserComponent,
    UserDetailsComponent,
    UserContainer,
    RootComponent,
    RootContainer
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GroupChatsModule,
    DirectChatsModule,
    SelectedChatsModule,
    UserModule
  ],
  exports: [
    RootContainer
  ]
})
export class UIModule { }
