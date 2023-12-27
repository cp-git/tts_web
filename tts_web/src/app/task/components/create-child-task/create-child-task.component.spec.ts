import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChildTaskComponent } from './create-child-task.component';

describe('CreateChildTaskComponent', () => {
  let component: CreateChildTaskComponent;
  let fixture: ComponentFixture<CreateChildTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateChildTaskComponent]
    });
    fixture = TestBed.createComponent(CreateChildTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
