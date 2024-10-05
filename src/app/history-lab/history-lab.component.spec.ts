import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryLabComponent } from './history-lab.component';

describe('HistoryLabComponent', () => {
  let component: HistoryLabComponent;
  let fixture: ComponentFixture<HistoryLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
