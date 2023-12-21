import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateportalComponent } from './updateportal.component';

describe('UpdateportalComponent', () => {
  let component: UpdateportalComponent;
  let fixture: ComponentFixture<UpdateportalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateportalComponent]
    });
    fixture = TestBed.createComponent(UpdateportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
