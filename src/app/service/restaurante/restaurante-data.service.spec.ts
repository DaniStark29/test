import { TestBed } from '@angular/core/testing';

import { RestauranteDataService } from './restaurante-data.service';

describe('RestauranteDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestauranteDataService = TestBed.get(RestauranteDataService);
    expect(service).toBeTruthy();
  });
});
