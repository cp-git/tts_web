import { TestBed } from '@angular/core/testing';

import { HiringCompanyService } from './hiring-company.service';

describe('HiringCompanyService', () => {
  let service: HiringCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HiringCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
