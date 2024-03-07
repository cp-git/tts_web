import { TestBed } from '@angular/core/testing';

import { BenchCandidateService } from './bench-candidate.service';

describe('BenchCandidateService', () => {
  let service: BenchCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BenchCandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
