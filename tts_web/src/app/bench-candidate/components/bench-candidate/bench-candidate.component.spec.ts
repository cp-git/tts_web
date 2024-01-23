import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchCandidateComponent } from './bench-candidate.component';

describe('BenchCandidateComponent', () => {
  let component: BenchCandidateComponent;
  let fixture: ComponentFixture<BenchCandidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BenchCandidateComponent]
    });
    fixture = TestBed.createComponent(BenchCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
