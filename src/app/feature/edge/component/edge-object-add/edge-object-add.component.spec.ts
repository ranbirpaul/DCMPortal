import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeObjectAddComponent } from './edge-object-add.component';

describe('EdgeObjectAddComponent', () => {
  let component: EdgeObjectAddComponent;
  let fixture: ComponentFixture<EdgeObjectAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeObjectAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeObjectAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
