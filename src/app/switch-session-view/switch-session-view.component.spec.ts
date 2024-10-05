import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchSessionViewComponent } from './switch-session-view.component';

describe('SwitchSessionViewComponent', () => {
  let component: SwitchSessionViewComponent;
  let fixture: ComponentFixture<SwitchSessionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchSessionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchSessionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
