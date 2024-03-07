import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetaxtypeComponent } from './updatetaxtype.component';

describe('UpdatetaxtypeComponent', () => {
  let component: UpdatetaxtypeComponent;
  let fixture: ComponentFixture<UpdatetaxtypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatetaxtypeComponent]
    });
    fixture = TestBed.createComponent(UpdatetaxtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
