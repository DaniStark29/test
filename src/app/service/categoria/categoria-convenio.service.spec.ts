import { TestBed } from '@angular/core/testing';

import { CategoriaConvenioService } from './categoria-convenio.service';

describe('CategoriaConvenioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriaConvenioService = TestBed.get(CategoriaConvenioService);
    expect(service).toBeTruthy();
  });
});
