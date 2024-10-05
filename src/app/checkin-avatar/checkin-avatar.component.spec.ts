import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinAvatarComponent } from './checkin-avatar.component';

describe('CheckinAvatarComponent', () => {
  let component: CheckinAvatarComponent;
  let fixture: ComponentFixture<CheckinAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckinAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
