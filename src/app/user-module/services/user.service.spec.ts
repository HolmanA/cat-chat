import { TestBed, inject } from '@angular/core/testing';
import { UserHttpService } from './user.service';
import { HttpClient } from '@angular/common/http';

describe('UserHttpService', () => {
  const httpClient = jasmine.createSpyObj('HttpClient', ['post', 'get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserHttpService,
        { provide: HttpClient, useValue: httpClient }
      ]
    });
  });

  it('should be created', inject([UserHttpService], (service: UserHttpService) => {
    expect(service).toBeTruthy();
  }));
});
