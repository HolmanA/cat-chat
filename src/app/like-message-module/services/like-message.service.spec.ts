import { TestBed, inject } from '@angular/core/testing';
import { LikeMessageHttpService } from './like-message.service';


describe('LikeMessageHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LikeMessageHttpService]
    });
  });

  it('should be created', inject([LikeMessageHttpService], (service: LikeMessageHttpService) => {
    expect(service).toBeTruthy();
  }));
});
