import { TestBed, inject } from '@angular/core/testing';
import { LikeMessageHttpService } from './like-message.service';
import { HttpClient } from '@angular/common/http';

describe('LikeMessageHttpService', () => {
  const httpClient = jasmine.createSpyObj('HttpClient', ['post']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LikeMessageHttpService,
        { provide: HttpClient, useValue: httpClient }
      ]
    });
  });

  it('should be created', inject([LikeMessageHttpService], (service: LikeMessageHttpService) => {
    expect(service).toBeTruthy();
  }));
});
