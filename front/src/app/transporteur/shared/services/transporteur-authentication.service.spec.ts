import { TestBed } from '@angular/core/testing';

import { TransporteurAuthenticationService } from './transporteur-authentication.service';

describe('TransporteurAuthenticationService', () => {
  let service: TransporteurAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransporteurAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
