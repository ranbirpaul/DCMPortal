import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectTypeConfigurationAddComponent } from './object-type-configuration-add.component';

describe('ObjectTypeConfigurationAddComponent', () => {
  let component: ObjectTypeConfigurationAddComponent;
  let fixture: ComponentFixture<ObjectTypeConfigurationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectTypeConfigurationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectTypeConfigurationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
