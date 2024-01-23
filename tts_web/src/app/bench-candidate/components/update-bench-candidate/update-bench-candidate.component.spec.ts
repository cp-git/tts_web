import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBenchCandidateComponent } from './update-bench-candidate.component';

describe('UpdateBenchCandidateComponent', () => {
  let component: UpdateBenchCandidateComponent;
  let fixture: ComponentFixture<UpdateBenchCandidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateBenchCandidateComponent]
    });
    fixture = TestBed.createComponent(UpdateBenchCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
