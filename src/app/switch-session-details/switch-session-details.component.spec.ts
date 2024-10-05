import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchSessionDetailsComponent } from './switch-session-details.component';

describe('SwitchSessionDetailsComponent', () => {
  let component: SwitchSessionDetailsComponent;
  let fixture: ComponentFixture<SwitchSessionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchSessionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchSessionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
