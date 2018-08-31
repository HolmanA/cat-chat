import { Selector } from "@ngxs/store";
import { GroupChatsStateModel, GroupChatsState } from "./group-chats.state";

export class GroupChatsSelectors {
	@Selector([GroupChatsState])
	static getGroupChats(state: GroupChatsStateModel) {
		return state.groupChats;
	}

	@Selector([GroupChatsState])
	static getSelectedGroupChat(state: GroupChatsStateModel) {
		return state.selectedGroupChat;
	}
}