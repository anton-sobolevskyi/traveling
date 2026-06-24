import { TestBed } from '@angular/core/testing';

import { PlaceStore } from './place-store';

describe('PlaceStore', () => {
  let service: PlaceStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
