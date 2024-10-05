import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinDoctorComponent } from './checkin-doctor.component';

describe('CheckinDoctorComponent', () => {
  let component: CheckinDoctorComponent;
  let fixture: ComponentFixture<CheckinDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckinDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
