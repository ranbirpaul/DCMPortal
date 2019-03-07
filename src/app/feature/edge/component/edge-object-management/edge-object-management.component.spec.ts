import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeObjectManagementComponent } from './edge-object-management.component';

describe('EdgeObjectManagementComponent', () => {
  let component: EdgeObjectManagementComponent;
  let fixture: ComponentFixture<EdgeObjectManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeObjectManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeObjectManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
