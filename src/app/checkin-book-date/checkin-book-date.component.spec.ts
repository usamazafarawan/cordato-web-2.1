import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinBookDateComponent } from './checkin-book-date.component';

describe('CheckinBookDateComponent', () => {
  let component: CheckinBookDateComponent;
  let fixture: ComponentFixture<CheckinBookDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckinBookDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinBookDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
