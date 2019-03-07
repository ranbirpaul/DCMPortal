import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectStructureAddComponent } from './object-structure-add.component';

describe('ObjectStructureAddComponent', () => {
  let component: ObjectStructureAddComponent;
  let fixture: ComponentFixture<ObjectStructureAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectStructureAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectStructureAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
