import { TestBed } from '@angular/core/testing';

import { HardcodeAuthenticationService } from './hardcode-authentication.service';

describe('HardcodeAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HardcodeAuthenticationService = TestBed.get(HardcodeAuthenticationService);
    expect(service).toBeTruthy();
  });
});
