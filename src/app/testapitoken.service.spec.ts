import { TestBed } from '@angular/core/testing';

import { TestapitokenService } from './testapitoken.service';

describe('TestapitokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestapitokenService = TestBed.get(TestapitokenService);
    expect(service).toBeTruthy();
  });
});
