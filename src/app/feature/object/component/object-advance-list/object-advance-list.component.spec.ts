import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectAdvanceListComponent } from './object-advance-list.component';

describe('ObjectAdvanceListComponent', () => {
  let component: ObjectAdvanceListComponent;
  let fixture: ComponentFixture<ObjectAdvanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectAdvanceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectAdvanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
