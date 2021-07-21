import { TestBed } from '@angular/core/testing';

import { BannerConfigService } from './banner-config.service';

describe('BannerConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BannerConfigService = TestBed.get(BannerConfigService);
    expect(service).toBeTruthy();
  });
});
