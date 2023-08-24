import { TestBed } from '@angular/core/testing';

import { PriceSuggestionServiceService } from './price-suggestion-service.service';

describe('PriceSuggestionServiceService', () => {
  let service: PriceSuggestionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceSuggestionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
