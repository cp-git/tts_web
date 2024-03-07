import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddportalComponent } from './addportal.component';

describe('AddportalComponent', () => {
  let component: AddportalComponent;
  let fixture: ComponentFixture<AddportalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddportalComponent]
    });
    fixture = TestBed.createComponent(AddportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
