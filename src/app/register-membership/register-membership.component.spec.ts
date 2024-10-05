import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMembershipComponent } from './register-membership.component';

describe('RegisterMembershipComponent', () => {
  let component: RegisterMembershipComponent;
  let fixture: ComponentFixture<RegisterMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterMembershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
