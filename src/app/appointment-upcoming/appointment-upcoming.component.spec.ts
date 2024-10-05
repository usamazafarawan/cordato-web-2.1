import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentUpcomingComponent } from './appointment-upcoming.component';

describe('AppointmentUpcomingComponent', () => {
  let component: AppointmentUpcomingComponent;
  let fixture: ComponentFixture<AppointmentUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentUpcomingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
