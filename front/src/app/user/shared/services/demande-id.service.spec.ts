import { TestBed } from '@angular/core/testing';

import { DemandeIDService } from './demande-id.service';

describe('DemandeIDService', () => {
  let service: DemandeIDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeIDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
