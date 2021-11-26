import { TestBed } from '@angular/core/testing';

import { DeviceDeciderService } from './device-decider.service';

describe('DeviceDeciderService', () => {
  let service: DeviceDeciderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceDeciderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
