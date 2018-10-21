import { TestBed, inject } from '@angular/core/testing';

import { GroupChatsHttpService } from './group-chats.service';
import { HttpClient } from '@angular/common/http';

describe('GroupChatsHttpService', () => {
  const httpClient = jasmine.createSpyObj('HttpClient', ['post', 'get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GroupChatsHttpService,
        { provide: HttpClient, useValue: httpClient }
      ]
    });
  });

  it('should be created', inject([GroupChatsHttpService], (service: GroupChatsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
