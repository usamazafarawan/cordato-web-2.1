import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachPersonalHealthComponent } from './coach-personal-health.component';

describe('CoachPersonalHealthComponent', () => {
  let component: CoachPersonalHealthComponent;
  let fixture: ComponentFixture<CoachPersonalHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachPersonalHealthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachPersonalHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
