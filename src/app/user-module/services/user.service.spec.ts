import { TestBed, inject } from '@angular/core/testing';
import { UserHttpService } from './user.service';


describe('UserHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserHttpService]
    });
  });

  it('should be created', inject([UserHttpService], (service: UserHttpService) => {
    expect(service).toBeTruthy();
  }));
});
