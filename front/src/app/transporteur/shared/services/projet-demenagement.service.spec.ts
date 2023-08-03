import { TestBed } from '@angular/core/testing';

import { ProjetDemenagementService } from './projet-demenagement.service';

describe('ProjetDemenagementService', () => {
  let service: ProjetDemenagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetDemenagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
