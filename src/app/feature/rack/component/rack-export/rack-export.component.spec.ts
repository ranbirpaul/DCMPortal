import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackExportComponent } from './rack-export.component';

describe('RackExportComponent', () => {
  let component: RackExportComponent;
  let fixture: ComponentFixture<RackExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RackExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RackExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
