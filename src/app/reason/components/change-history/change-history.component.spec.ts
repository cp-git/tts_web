import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeHistoryComponent } from './change-history.component';

describe('ChangeHistoryComponent', () => {
  let component: ChangeHistoryComponent;
  let fixture: ComponentFixture<ChangeHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeHistoryComponent]
    });
    fixture = TestBed.createComponent(ChangeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
