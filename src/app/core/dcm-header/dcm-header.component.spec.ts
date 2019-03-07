import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcmHeaderComponent } from './dcm-header.component';

describe('DcmHeaderComponent', () => {
  let component: DcmHeaderComponent;
  let fixture: ComponentFixture<DcmHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcmHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcmHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
