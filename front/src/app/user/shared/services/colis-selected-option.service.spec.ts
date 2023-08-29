import { TestBed } from '@angular/core/testing';

import { ColisSelectedOptionService } from './colis-selected-option.service';

describe('ColisSelectedOptionService', () => {
  let service: ColisSelectedOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColisSelectedOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
