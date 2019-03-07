import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeObjectTreeComponent } from './edge-object-tree.component';

describe('EdgeObjectTreeComponent', () => {
  let component: EdgeObjectTreeComponent;
  let fixture: ComponentFixture<EdgeObjectTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeObjectTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeObjectTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
