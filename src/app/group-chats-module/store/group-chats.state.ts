import { Action, StateContext, State } from "@ngxs/store";
import * as GroupChatsStateActions from '../actions/group-chats.actions';
import * as GroupChatsContainerActions from '../../cat-chat-module/group-chats/actions/group-chats-container.actions';
import { catchError, tap } from "rxjs/operators";
import { asapScheduler, of, Observable } from "rxjs";
import { GroupChatsHttpService } from "../services/group-chats.service";

export interface GroupChatsStateModel {
    groupChats: any[];
    selectedGroupChat: {
        id: string;
        messages: any;
    }
}

const defaults: GroupChatsStateModel = {
    groupChats: [],
    selectedGroupChat: null
}

@State<GroupChatsStateModel>({
    name: 'groupChats',
    defaults
})

export class GroupChatsState {
    constructor(private groupChatsService: GroupChatsHttpService) { }

    @Action(GroupChatsContainerActions.Initialized)
    fetchGroups({ patchState, dispatch }: StateContext<GroupChatsStateModel>) {
        return this.groupChatsService.fetchGroups().pipe(
            tap(groupChats => {
                patchState({
                    groupChats: groupChats
                });
                asapScheduler.schedule(() => dispatch(new GroupChatsStateActions.FetchGroupChatsSucceeded(groupChats)));
            }),
            catchError(error => {
                return of(asapScheduler.schedule(() => dispatch(new GroupChatsStateActions.FetchGroupChatsFailed(error))));
            })
        );
    }

    @Action(GroupChatsContainerActions.GroupChatSelected)
    fetchGroup({ patchState, dispatch }: StateContext<GroupChatsStateModel>, { groupChat }: GroupChatsContainerActions.GroupChatSelected) {
        // return this.groupChatsService.fetchGroup(groupChatId).pipe(
        //     tap(groupChat => {
        //         console.log('groupChat', groupChat);
        //         patchState({
        //             selectedGroupChat: groupChat
        //         });
        //         asapScheduler.schedule(() => dispatch(new GroupChatsStateActions.FetchGroupChatSucceeded(groupChat)));
        //     }),
        //     catchError(error => {
        //         return of(asapScheduler.schedule(() => dispatch(new GroupChatsStateActions.FetchGroupChatFailed(error))));
        //     })
        // );
        return this.groupChatsService.fetchMessages(groupChat.group_id).pipe(
            tap(messages => {
                patchState({
                    selectedGroupChat: { 
                        ...groupChat,
                        messages: messages
                    }
                });
                asapScheduler.schedule(() => dispatch(new GroupChatsStateActions.FetchGroupChatSucceeded()));
            }),
            catchError(error => {
                return of(asapScheduler.schedule(() => dispatch(new GroupChatsStateActions.FetchGroupChatFailed(error))));
            })
        );
    }
}