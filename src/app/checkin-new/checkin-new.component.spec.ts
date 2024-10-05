import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinNewComponent } from './checkin-new.component';

describe('CheckinNewComponent', () => {
  let component: CheckinNewComponent;
  let fixture: ComponentFixture<CheckinNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckinNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
