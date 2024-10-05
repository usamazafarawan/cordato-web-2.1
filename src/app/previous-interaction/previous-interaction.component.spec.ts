import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousInteractionComponent } from './previous-interaction.component';

describe('PreviousInteractionComponent', () => {
  let component: PreviousInteractionComponent;
  let fixture: ComponentFixture<PreviousInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousInteractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
