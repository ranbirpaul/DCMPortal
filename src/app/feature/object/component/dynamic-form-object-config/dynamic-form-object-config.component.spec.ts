import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormObjectConfigComponent } from './dynamic-form-object-config.component';

describe('DynamicFormObjectConfigComponent', () => {
  let component: DynamicFormObjectConfigComponent;
  let fixture: ComponentFixture<DynamicFormObjectConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormObjectConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormObjectConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
