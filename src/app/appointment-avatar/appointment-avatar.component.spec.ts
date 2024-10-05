import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentAvatarComponent } from './appointment-avatar.component';

describe('AppointmentAvatarComponent', () => {
  let component: AppointmentAvatarComponent;
  let fixture: ComponentFixture<AppointmentAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
