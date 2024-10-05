import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDiagnosedComponent } from './register-diagnosed.component';

describe('RegisterDiagnosedComponent', () => {
  let component: RegisterDiagnosedComponent;
  let fixture: ComponentFixture<RegisterDiagnosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDiagnosedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDiagnosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
