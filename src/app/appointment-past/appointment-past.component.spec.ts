import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPastComponent } from './appointment-past.component';

describe('AppointmentPastComponent', () => {
  let component: AppointmentPastComponent;
  let fixture: ComponentFixture<AppointmentPastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentPastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentPastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
