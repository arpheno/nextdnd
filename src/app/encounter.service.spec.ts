import { TestBed } from '@angular/core/testing';

import { EncounterService } from './encounters/encounter.service';

describe('EncounterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncounterService = TestBed.get(EncounterService);
    expect(service).toBeTruthy();
  });
});
