import { TestBed } from '@angular/core/testing';

import { VariantcacherService } from './variantcacher.service';

describe('VariantcacherService', () => {
  let service: VariantcacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariantcacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
