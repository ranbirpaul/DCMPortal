import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTenantAddComponent } from './user-tenant-add.component';

describe('UserTenantAddComponent', () => {
  let component: UserTenantAddComponent;
  let fixture: ComponentFixture<UserTenantAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTenantAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTenantAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
