import { TestBed } from '@angular/core/testing';

import { TextypeService } from './textype.service';

describe('TextypeService', () => {
  let service: TextypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
