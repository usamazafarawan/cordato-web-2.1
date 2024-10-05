import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinSymptomsComponent } from './checkin-symptoms.component';

describe('CheckinSymptomsComponent', () => {
  let component: CheckinSymptomsComponent;
  let fixture: ComponentFixture<CheckinSymptomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckinSymptomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
