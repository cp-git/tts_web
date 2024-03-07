import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportgenComponent } from './reportgen.component';

describe('ReportgenComponent', () => {
  let component: ReportgenComponent;
  let fixture: ComponentFixture<ReportgenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportgenComponent]
    });
    fixture = TestBed.createComponent(ReportgenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
