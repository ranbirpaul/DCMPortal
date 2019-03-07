import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackToBcmListComponent } from './rack-to-bcm-list.component';

describe('RackToBcmListComponent', () => {
  let component: RackToBcmListComponent;
  let fixture: ComponentFixture<RackToBcmListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RackToBcmListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RackToBcmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
