import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBenchCandidateComponent } from './create-bench-candidate.component';

describe('CreateBenchCandidateComponent', () => {
  let component: CreateBenchCandidateComponent;
  let fixture: ComponentFixture<CreateBenchCandidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBenchCandidateComponent]
    });
    fixture = TestBed.createComponent(CreateBenchCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
