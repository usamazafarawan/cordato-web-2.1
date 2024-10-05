import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryLabDetailsComponent } from './history-lab-details.component';

describe('HistoryLabDetailsComponent', () => {
  let component: HistoryLabDetailsComponent;
  let fixture: ComponentFixture<HistoryLabDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryLabDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryLabDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
