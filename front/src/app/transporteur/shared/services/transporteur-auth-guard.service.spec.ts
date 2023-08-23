import { TestBed } from '@angular/core/testing';

import { TransporteurAuthGuardService } from './transporteur-auth-guard.service';

describe('TransporteurAuthGuardService', () => {
  let service: TransporteurAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransporteurAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
