import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcmHeaderMenuComponent } from './dcm-header-menu.component';

describe('DcmHeaderMenuComponent', () => {
  let component: DcmHeaderMenuComponent;
  let fixture: ComponentFixture<DcmHeaderMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcmHeaderMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcmHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
