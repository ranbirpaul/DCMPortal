import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeConfigurationAddComponent } from './edge-configuration-add.component';

describe('EdgeConfigurationAddComponent', () => {
  let component: EdgeConfigurationAddComponent;
  let fixture: ComponentFixture<EdgeConfigurationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeConfigurationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeConfigurationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
