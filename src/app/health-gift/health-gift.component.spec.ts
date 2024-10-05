import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthGiftComponent } from './health-gift.component';

describe('HealthGiftComponent', () => {
  let component: HealthGiftComponent;
  let fixture: ComponentFixture<HealthGiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthGiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
