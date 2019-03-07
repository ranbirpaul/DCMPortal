import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackAddComponent } from './rack-add.component';

describe('RackAddComponent', () => {
  let component: RackAddComponent;
  let fixture: ComponentFixture<RackAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RackAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RackAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
