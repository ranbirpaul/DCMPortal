import { TestBed } from '@angular/core/testing';

import { DatacenterService } from './datacenter.service';

describe('DatacenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatacenterService = TestBed.get(DatacenterService);
    expect(service).toBeTruthy();
  });
});
