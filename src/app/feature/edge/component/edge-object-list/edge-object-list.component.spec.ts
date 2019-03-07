import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeObjectListComponent } from './edge-object-list.component';

describe('EdgeObjectListComponent', () => {
  let component: EdgeObjectListComponent;
  let fixture: ComponentFixture<EdgeObjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeObjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeObjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
