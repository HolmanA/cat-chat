import { async, TestBed } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { GroupChatsState } from './group-chats.state';
import { GroupChatsHttpService } from '../services/group-chats.service';
import * as GroupChatsContainerActions from '../../ui-module/group-chats/actions/group-chats-container.actions';
import * as SelectedChatsStateActions from '../../selected-chats-module/actions/selected-chats.actions';
import { of } from 'rxjs';

describe('GroupChatsState', () => {
    let store: Store;
    const groupChatsMock = [
        {
            id: '1',
            name: 'TestGroup1'
        },
        {
            id: '2',
            name: 'TestGroup2'
        }
    ];

    const groupChatsServiceMock = jasmine.createSpyObj('groupChatsServce',  {
        'fetchGroups': of(groupChatsMock)
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([GroupChatsState])
            ],
            providers: [
                { provide: GroupChatsHttpService, useValue: groupChatsServiceMock }
            ]
        }).compileComponents();
        store = TestBed.get(Store);
    }));

    it('sets groups state', async(() => {
        store.dispatch(new GroupChatsContainerActions.Initialized());
        store.selectOnce(state => state.groupChats.groupChats).subscribe(chats => {
            expect(chats).toEqual(groupChatsMock);
        });
    }));
});
