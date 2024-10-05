import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentBookReasonComponent } from './appointment-book-reason.component';

describe('AppointmentBookReasonComponent', () => {
  let component: AppointmentBookReasonComponent;
  let fixture: ComponentFixture<AppointmentBookReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentBookReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentBookReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
