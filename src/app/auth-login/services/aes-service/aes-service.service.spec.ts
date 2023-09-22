import { TestBed } from '@angular/core/testing';

import { AesServiceService } from './aes-service.service';

describe('AesServiceService', () => {
  let service: AesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
