import { TestBed } from '@angular/core/testing';

import { DemandeDemenagementService } from './demande-demenagement.service';

describe('DemandeDemenagementService', () => {
  let service: DemandeDemenagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeDemenagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
