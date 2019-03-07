import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqipmentExportComponent } from './equipment-export.component';

describe('EqipmentExportComponent', () => {
  let component: EqipmentExportComponent;
  let fixture: ComponentFixture<EqipmentExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqipmentExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqipmentExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
