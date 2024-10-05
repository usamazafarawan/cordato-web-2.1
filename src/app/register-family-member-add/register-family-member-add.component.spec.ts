import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFamilyMemberAddComponent } from './register-family-member-add.component';

describe('RegisterFamilyMemberAddComponent', () => {
  let component: RegisterFamilyMemberAddComponent;
  let fixture: ComponentFixture<RegisterFamilyMemberAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFamilyMemberAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFamilyMemberAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
