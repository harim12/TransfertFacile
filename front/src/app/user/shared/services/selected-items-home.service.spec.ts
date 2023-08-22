import { TestBed } from '@angular/core/testing';

import { SelectedItemsHomeService } from './selected-items-home.service';

describe('SelectedItemsHomeService', () => {
  let service: SelectedItemsHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedItemsHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
