import { TestBed } from '@angular/core/testing';

import { DialogueBoxService } from './dialogue-box.service';

describe('DialogueBoxService', () => {
  let service: DialogueBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogueBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
