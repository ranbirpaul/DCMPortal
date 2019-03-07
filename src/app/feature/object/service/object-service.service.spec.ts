import { TestBed } from '@angular/core/testing';

import { ObjectServiceService } from './object-service.service';

describe('ObjectServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObjectServiceService = TestBed.get(ObjectServiceService);
    expect(service).toBeTruthy();
  });
});
