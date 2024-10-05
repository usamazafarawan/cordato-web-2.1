import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClickonComponent } from './register-clickon.component';

describe('RegisterClickonComponent', () => {
  let component: RegisterClickonComponent;
  let fixture: ComponentFixture<RegisterClickonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterClickonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterClickonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
