import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectAdvanceComponent } from './object-advance.component';

describe('ObjectAdvanceComponent', () => {
  let component: ObjectAdvanceComponent;
  let fixture: ComponentFixture<ObjectAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
