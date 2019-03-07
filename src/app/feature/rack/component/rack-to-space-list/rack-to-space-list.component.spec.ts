import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackToSpaceListComponent } from './rack-to-space-list.component';

describe('RackToSpaceListComponent', () => {
  let component: RackToSpaceListComponent;
  let fixture: ComponentFixture<RackToSpaceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RackToSpaceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RackToSpaceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
