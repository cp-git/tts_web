import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatevisaComponent } from './updatevisa.component';

describe('UpdatevisaComponent', () => {
  let component: UpdatevisaComponent;
  let fixture: ComponentFixture<UpdatevisaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatevisaComponent]
    });
    fixture = TestBed.createComponent(UpdatevisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
