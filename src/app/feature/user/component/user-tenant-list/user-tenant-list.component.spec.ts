import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTenantListComponent } from './user-tenant-list.component';

describe('UserTenantListComponent', () => {
  let component: UserTenantListComponent;
  let fixture: ComponentFixture<UserTenantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTenantListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTenantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
