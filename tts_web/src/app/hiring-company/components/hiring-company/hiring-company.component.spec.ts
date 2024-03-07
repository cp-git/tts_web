import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringCompanyComponent } from './hiring-company.component';

describe('HiringCompanyComponent', () => {
  let component: HiringCompanyComponent;
  let fixture: ComponentFixture<HiringCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HiringCompanyComponent]
    });
    fixture = TestBed.createComponent(HiringCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
