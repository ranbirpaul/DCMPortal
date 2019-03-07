import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcmFooterComponent } from './dcm-footer.component';

describe('DcmFooterComponent', () => {
  let component: DcmFooterComponent;
  let fixture: ComponentFixture<DcmFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcmFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcmFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
