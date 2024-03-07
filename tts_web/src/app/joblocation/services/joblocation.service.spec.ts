import { TestBed } from '@angular/core/testing';

import { JoblocationService } from './joblocation.service';

describe('JoblocationService', () => {
  let service: JoblocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoblocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
