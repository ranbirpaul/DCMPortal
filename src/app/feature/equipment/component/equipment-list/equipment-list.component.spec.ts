import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqipmentListComponent } from './equipment-list.component';

describe('EqipmentListComponent', () => {
  let component: EqipmentListComponent;
  let fixture: ComponentFixture<EqipmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqipmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
