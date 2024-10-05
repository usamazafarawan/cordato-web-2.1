import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentBookDateComponent } from './appointment-book-date.component';

describe('AppointmentBookDateComponent', () => {
  let component: AppointmentBookDateComponent;
  let fixture: ComponentFixture<AppointmentBookDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentBookDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentBookDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
