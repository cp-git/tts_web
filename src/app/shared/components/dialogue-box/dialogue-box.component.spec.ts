import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueBoxComponent } from './dialogue-box.component';

describe('DialogueBoxComponent', () => {
  let component: DialogueBoxComponent;
  let fixture: ComponentFixture<DialogueBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogueBoxComponent]
    });
    fixture = TestBed.createComponent(DialogueBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
