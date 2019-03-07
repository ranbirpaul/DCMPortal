import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackToTenantComponent } from './rack-to-tenant.component';

describe('RackToTenantComponent', () => {
  let component: RackToTenantComponent;
  let fixture: ComponentFixture<RackToTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RackToTenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RackToTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
