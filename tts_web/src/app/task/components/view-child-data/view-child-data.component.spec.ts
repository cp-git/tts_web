import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChildDataComponent } from './view-child-data.component';

describe('ViewChildDataComponent', () => {
  let component: ViewChildDataComponent;
  let fixture: ComponentFixture<ViewChildDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewChildDataComponent]
    });
    fixture = TestBed.createComponent(ViewChildDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
