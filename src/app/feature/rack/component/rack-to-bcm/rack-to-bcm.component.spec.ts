import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackToBcmComponent } from './rack-to-bcm.component';

describe('RackToBcmComponent', () => {
  let component: RackToBcmComponent;
  let fixture: ComponentFixture<RackToBcmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RackToBcmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RackToBcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
