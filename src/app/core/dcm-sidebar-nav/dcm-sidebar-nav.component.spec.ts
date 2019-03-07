import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcmSidebarNavComponent } from './dcm-sidebar-nav.component';

describe('DcmSidebarNavComponent', () => {
  let component: DcmSidebarNavComponent;
  let fixture: ComponentFixture<DcmSidebarNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcmSidebarNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcmSidebarNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
