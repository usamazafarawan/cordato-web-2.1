import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetTokenexpireComponent } from './reset-tokenexpire.component';

describe('ResetTokenexpireComponent', () => {
  let component: ResetTokenexpireComponent;
  let fixture: ComponentFixture<ResetTokenexpireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetTokenexpireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetTokenexpireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
