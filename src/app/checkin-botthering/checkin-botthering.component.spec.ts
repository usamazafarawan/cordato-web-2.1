import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinBottheringComponent } from './checkin-botthering.component';

describe('CheckinBottheringComponent', () => {
  let component: CheckinBottheringComponent;
  let fixture: ComponentFixture<CheckinBottheringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckinBottheringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinBottheringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
