import { TestBed } from '@angular/core/testing';

import { CharacterService } from './characters/character.service';

describe('CharacterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharacterService = TestBed.get(CharacterService);
    expect(service).toBeTruthy();
  });
});
