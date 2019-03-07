import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackImportComponent } from './rack-import.component';

describe('RackImportComponent', () => {
  let component: RackImportComponent;
  let fixture: ComponentFixture<RackImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RackImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RackImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
