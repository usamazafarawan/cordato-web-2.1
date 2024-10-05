import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSetpasswordComponent } from './register-setpassword.component';

describe('RegisterSetpasswordComponent', () => {
  let component: RegisterSetpasswordComponent;
  let fixture: ComponentFixture<RegisterSetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSetpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
