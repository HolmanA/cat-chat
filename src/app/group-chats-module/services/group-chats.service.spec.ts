import { TestBed, inject } from '@angular/core/testing';

import { GroupChatsHttpService } from './group-chats.service';

describe('GroupChatsHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupChatsHttpService]
    });
  });

  it('should be created', inject([GroupChatsHttpService], (service: GroupChatsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
