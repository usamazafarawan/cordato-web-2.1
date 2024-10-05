import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinBookDoctorComponent } from './checkin-book-doctor.component';

describe('CheckinBookDoctorComponent', () => {
  let component: CheckinBookDoctorComponent;
  let fixture: ComponentFixture<CheckinBookDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckinBookDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinBookDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
