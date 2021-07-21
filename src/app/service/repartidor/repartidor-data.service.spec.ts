import { TestBed } from '@angular/core/testing';

import { RepartidorDataService } from './repartidor-data.service';

describe('RepartidorDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepartidorDataService = TestBed.get(RepartidorDataService);
    expect(service).toBeTruthy();
  });
});
