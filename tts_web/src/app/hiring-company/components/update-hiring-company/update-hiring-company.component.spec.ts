import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHiringCompanyComponent } from './update-hiring-company.component';

describe('UpdateHiringCompanyComponent', () => {
  let component: UpdateHiringCompanyComponent;
  let fixture: ComponentFixture<UpdateHiringCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateHiringCompanyComponent]
    });
    fixture = TestBed.createComponent(UpdateHiringCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
