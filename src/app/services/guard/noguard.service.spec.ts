import { TestBed } from '@angular/core/testing';

import { NoguardService } from './noguard.service';

describe('NoguardService', () => {
  let service: NoguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
