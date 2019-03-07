import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackToSpaceComponent } from './rack-to-space.component';

describe('RackToSpaceComponent', () => {
  let component: RackToSpaceComponent;
  let fixture: ComponentFixture<RackToSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RackToSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RackToSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
