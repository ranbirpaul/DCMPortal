import { TestBed } from '@angular/core/testing';

import { EdgeObjectService } from './edge-object.service';

describe('EdgeObjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EdgeObjectService = TestBed.get(EdgeObjectService);
    expect(service).toBeTruthy();
  });
});
