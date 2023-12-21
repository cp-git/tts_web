import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddjoblocationComponent } from './addjoblocation.component';

describe('AddjoblocationComponent', () => {
  let component: AddjoblocationComponent;
  let fixture: ComponentFixture<AddjoblocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddjoblocationComponent]
    });
    fixture = TestBed.createComponent(AddjoblocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
