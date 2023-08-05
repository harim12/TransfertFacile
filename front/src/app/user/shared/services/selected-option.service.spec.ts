import { TestBed } from '@angular/core/testing';

import { SelectedOptionService } from './selected-option.service';

describe('SelectedOptionService', () => {
  let service: SelectedOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
