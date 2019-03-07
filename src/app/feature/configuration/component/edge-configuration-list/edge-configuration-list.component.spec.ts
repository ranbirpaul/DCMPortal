import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeConfigurationListComponent } from './edge-configuration-list.component';

describe('EdgeConfigurationListComponent', () => {
  let component: EdgeConfigurationListComponent;
  let fixture: ComponentFixture<EdgeConfigurationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeConfigurationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeConfigurationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
