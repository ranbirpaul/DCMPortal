import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectSelectStructureComponent } from './object-select-structure.component';

describe('ObjectSelectStructureComponent', () => {
  let component: ObjectSelectStructureComponent;
  let fixture: ComponentFixture<ObjectSelectStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectSelectStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectSelectStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
