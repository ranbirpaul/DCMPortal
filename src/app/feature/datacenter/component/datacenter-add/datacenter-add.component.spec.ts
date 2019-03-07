import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacenterAddComponent } from './datacenter-add.component';

describe('DatacenterAddComponent', () => {
  let component: DatacenterAddComponent;
  let fixture: ComponentFixture<DatacenterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatacenterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacenterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
