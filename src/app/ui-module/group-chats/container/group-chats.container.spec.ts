import { GroupChatsContainer } from './group-chats.container';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxsTestUtilities } from 'src/util/test/NgxsTestUtilities';
import { of } from 'rxjs';
import * as GroupChatsContainerActions from '../actions/group-chats-container.actions';

describe('GroupChatsContainer', () => {
    let container: GroupChatsContainer;
    let fixture: ComponentFixture<GroupChatsContainer>;

    const storeMock = jasmine.createSpyObj('store', ['dispatch']);
    const groupChatsMock = [
        {
            id: '1',
            name: 'Test Group 1',
            members: [
                {
                    id: '1-1',
                    roles: [
                        'admin',
                        'owner'
                    ],
                    name: 'Test Member 1-1'
                },
                {
                    id: '1-2',
                    roles: [
                        'user'
                    ],
                    name: 'Test Member 1-2'
                }
            ],
            messages: {
                count: 39965,
                last_message_id: '1',
                preview: {
                    nickname: 'Member',
                    text: 'Text',
                }
            },
            max_members: 500
        },
        {
            id: '2',
            name: 'Test Group 2',
            members: [
                {
                    id: '2-1',
                    roles: [
                        'admin',
                        'owner'
                    ],
                    name: 'Test Member 2-1'
                },
                {
                    id: '2-2',
                    roles: [
                        'user'
                    ],
                    name: 'Test Member 2-2'
                }
            ],
            messages: {
                count: 39965,
                last_message_id: '2',
                preview: {
                    nickname: 'Member',
                    text: 'Text',
                }
            },
            max_members: 500
        }
    ];
    const selectedChatsMock = [groupChatsMock[0]];
    const messageQueuesMock = [
        {
            chatId: '1',
            queue: [
                {
                    group_id: '1',
                    id: '1',
                    name: 'Test Member',
                    text: 'T',
                },
                {
                    group_id: '1',
                    id: '2',
                    name: 'Test Member 2',
                    text: 'T2',
                }
            ]
        },
        {
            chatId: '2',
            queue: [
                {
                    group_id: '2',
                    id: '1',
                    name: 'Test Member',
                    text: 'T',
                },
                {
                    group_id: '2',
                    id: '2',
                    name: 'Test Member 2',
                    text: 'T2',
                }
            ]
        }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GroupChatsContainer],
            providers: [
                { provide: Store, useValue: storeMock }
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        });
        fixture = TestBed.createComponent(GroupChatsContainer);
        container = fixture.componentInstance;

        NgxsTestUtilities.mockDecoratedSelectors(container, [
            { variableName: 'groupChats$', useValue: of(groupChatsMock) },
            { variableName: 'selectedChats$', useValue: of(selectedChatsMock) },
            { variableName: 'messageQueues$', useValue: of(messageQueuesMock) }
        ]);
    });

    describe('ngOnInit', () => {
        it('dispatches initialized action', () => {
            fixture.detectChanges();

            expect(storeMock.dispatch).toHaveBeenCalledWith(new GroupChatsContainerActions.Initialized());
        });
    });

    describe('groupChatSelected', () => {
        it('dispatches group chat selected action', () => {
            container.groupChatSelected(groupChatsMock[0]);

            fixture.detectChanges();

            expect(storeMock.dispatch).toHaveBeenCalledWith(new GroupChatsContainerActions.GroupChatSelected(groupChatsMock[0]));
        });
    });
});
