import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentBookVitalsComponent } from './appointment-book-vitals.component';

describe('AppointmentBookVitalsComponent', () => {
  let component: AppointmentBookVitalsComponent;
  let fixture: ComponentFixture<AppointmentBookVitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentBookVitalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentBookVitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
