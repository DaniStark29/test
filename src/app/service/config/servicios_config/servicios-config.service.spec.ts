import { TestBed } from '@angular/core/testing';

import { ServiciosConfigService } from './servicios-config.service';

describe('ServiciosConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiciosConfigService = TestBed.get(ServiciosConfigService);
    expect(service).toBeTruthy();
  });
});
