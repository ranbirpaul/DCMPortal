import { TestBed } from '@angular/core/testing';

import { ObjectControlServiceService } from './object-control-service.service';

describe('ObjectControlServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObjectControlServiceService = TestBed.get(ObjectControlServiceService);
    expect(service).toBeTruthy();
  });
});
