import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFamilyMemberEditComponent } from './register-family-member-edit.component';

describe('RegisterFamilyMemberEditComponent', () => {
  let component: RegisterFamilyMemberEditComponent;
  let fixture: ComponentFixture<RegisterFamilyMemberEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFamilyMemberEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFamilyMemberEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
