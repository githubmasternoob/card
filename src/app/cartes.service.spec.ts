import {TestBed} from '@angular/core/testing';

import {CartesService} from './cartes.service';

describe('CartesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartesService = TestBed.get(CartesService);
    expect(service).toBeTruthy();
  });
});
