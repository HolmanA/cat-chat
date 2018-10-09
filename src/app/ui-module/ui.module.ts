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

@NgModule({
  declarations: [
    GroupChatsListComponent,
    GroupChatsContainer,
    GroupMessagesListComponent,
    GroupMessagesListItemComponent,
    GroupMessagesListItemContainer,
    GroupMessageInputComponent,
    GroupMessagesContainer,
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
    SelectedChatsModule,
    UserModule
  ],
  exports: [
    RootContainer
  ]
})
export class UIModule { }
