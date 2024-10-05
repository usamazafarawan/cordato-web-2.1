import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinBookDoctorDetailsComponent } from './checkin-book-doctor-details.component';

describe('CheckinBookDoctorDetailsComponent', () => {
  let component: CheckinBookDoctorDetailsComponent;
  let fixture: ComponentFixture<CheckinBookDoctorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckinBookDoctorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinBookDoctorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
