import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHiringCompanyComponent } from './create-hiring-company.component';

describe('CreateHiringCompanyComponent', () => {
  let component: CreateHiringCompanyComponent;
  let fixture: ComponentFixture<CreateHiringCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateHiringCompanyComponent]
    });
    fixture = TestBed.createComponent(CreateHiringCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
