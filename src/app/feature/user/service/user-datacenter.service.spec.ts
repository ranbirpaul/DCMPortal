import { TestBed } from '@angular/core/testing';

import { UserDatacenterService } from './user-datacenter.service';

describe('UserDatacenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDatacenterService = TestBed.get(UserDatacenterService);
    expect(service).toBeTruthy();
  });
});
