import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectTypeAddComponent } from './object-type-add.component';

describe('ObjectTypeAddComponent', () => {
  let component: ObjectTypeAddComponent;
  let fixture: ComponentFixture<ObjectTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
