import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcmMainComponent } from './dcm-main.component';

describe('DcmMainComponent', () => {
  let component: DcmMainComponent;
  let fixture: ComponentFixture<DcmMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcmMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcmMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
