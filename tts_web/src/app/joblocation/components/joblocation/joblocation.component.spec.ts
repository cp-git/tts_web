import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoblocationComponent } from './joblocation.component';

describe('JoblocationComponent', () => {
  let component: JoblocationComponent;
  let fixture: ComponentFixture<JoblocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoblocationComponent]
    });
    fixture = TestBed.createComponent(JoblocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
