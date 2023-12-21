import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatejoblocationComponent } from './updatejoblocation.component';

describe('UpdatejoblocationComponent', () => {
  let component: UpdatejoblocationComponent;
  let fixture: ComponentFixture<UpdatejoblocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatejoblocationComponent]
    });
    fixture = TestBed.createComponent(UpdatejoblocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
