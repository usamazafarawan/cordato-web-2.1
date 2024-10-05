import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachPersonalDetailsComponent } from './coach-personal-details.component';

describe('CoachPersonalDetailsComponent', () => {
  let component: CoachPersonalDetailsComponent;
  let fixture: ComponentFixture<CoachPersonalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachPersonalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachPersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
