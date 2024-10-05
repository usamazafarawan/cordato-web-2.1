import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubscriptionGenrateComponent } from './manage-subscription-genrate.component';

describe('ManageSubscriptionGenrateComponent', () => {
  let component: ManageSubscriptionGenrateComponent;
  let fixture: ComponentFixture<ManageSubscriptionGenrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSubscriptionGenrateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSubscriptionGenrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
