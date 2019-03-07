import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcmNavigationComponent } from './dcm-navigation.component';

describe('DcmNavigationComponent', () => {
  let component: DcmNavigationComponent;
  let fixture: ComponentFixture<DcmNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcmNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcmNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
