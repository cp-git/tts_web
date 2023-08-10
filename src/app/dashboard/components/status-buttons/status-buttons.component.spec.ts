import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusButtonsComponent } from './status-buttons.component';

describe('StatusButtonsComponent', () => {
  let component: StatusButtonsComponent;
  let fixture: ComponentFixture<StatusButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusButtonsComponent]
    });
    fixture = TestBed.createComponent(StatusButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
