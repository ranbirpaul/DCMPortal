import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackToTenantListComponent } from './rack-to-tenant-list.component';

describe('RackToTenantListComponent', () => {
  let component: RackToTenantListComponent;
  let fixture: ComponentFixture<RackToTenantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RackToTenantListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RackToTenantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
