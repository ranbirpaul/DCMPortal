import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectTypeListComponent } from './object-type-list.component';

describe('ObjectTypeListComponent', () => {
  let component: ObjectTypeListComponent;
  let fixture: ComponentFixture<ObjectTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
