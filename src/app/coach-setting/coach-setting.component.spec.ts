import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachSettingComponent } from './coach-setting.component';

describe('CoachSettingComponent', () => {
  let component: CoachSettingComponent;
  let fixture: ComponentFixture<CoachSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
