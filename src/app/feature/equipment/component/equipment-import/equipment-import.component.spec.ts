import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqipmentImportComponent } from './equipment-import.component';

describe('EqipmentImportComponent', () => {
  let component: EqipmentImportComponent;
  let fixture: ComponentFixture<EqipmentImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqipmentImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqipmentImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
