import { TestBed } from '@angular/core/testing';

import { AdministradorDataService } from './administrador-data.service';

describe('AdministradorDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdministradorDataService = TestBed.get(AdministradorDataService);
    expect(service).toBeTruthy();
  });
});
