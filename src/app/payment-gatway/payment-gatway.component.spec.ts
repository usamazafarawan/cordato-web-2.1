import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGatwayComponent } from './payment-gatway.component';

describe('PaymentGatwayComponent', () => {
  let component: PaymentGatwayComponent;
  let fixture: ComponentFixture<PaymentGatwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentGatwayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentGatwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
