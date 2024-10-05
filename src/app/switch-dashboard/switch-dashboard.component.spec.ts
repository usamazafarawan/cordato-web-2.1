import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchDashboardComponent } from './switch-dashboard.component';

describe('SwitchDashboardComponent', () => {
  let component: SwitchDashboardComponent;
  let fixture: ComponentFixture<SwitchDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
