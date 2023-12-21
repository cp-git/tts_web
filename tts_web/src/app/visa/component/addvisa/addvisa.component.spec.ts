import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvisaComponent } from './addvisa.component';

describe('AddvisaComponent', () => {
  let component: AddvisaComponent;
  let fixture: ComponentFixture<AddvisaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddvisaComponent]
    });
    fixture = TestBed.createComponent(AddvisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
