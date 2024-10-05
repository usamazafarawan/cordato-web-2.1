import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentBookMedicationComponent } from './appointment-book-medication.component';

describe('AppointmentBookMedicationComponent', () => {
  let component: AppointmentBookMedicationComponent;
  let fixture: ComponentFixture<AppointmentBookMedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentBookMedicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentBookMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
