import {TestBed} from '@angular/core/testing';

import {MdetailService} from './mdetail.service';

describe('MdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should be created', () => {
    const service: MdetailService = TestBed.get(MdetailService);
    expect(service).toBeTruthy();
  });
});
