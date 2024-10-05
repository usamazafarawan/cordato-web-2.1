import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentBookDoctorDetailsComponent } from './appointment-book-doctor-details.component';

describe('AppointmentBookDoctorDetailsComponent', () => {
  let component: AppointmentBookDoctorDetailsComponent;
  let fixture: ComponentFixture<AppointmentBookDoctorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentBookDoctorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentBookDoctorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
