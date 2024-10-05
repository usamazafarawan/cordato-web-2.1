import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentBookDoctorComponent } from './appointment-book-doctor.component';

describe('AppointmentBookDoctorComponent', () => {
  let component: AppointmentBookDoctorComponent;
  let fixture: ComponentFixture<AppointmentBookDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentBookDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentBookDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
