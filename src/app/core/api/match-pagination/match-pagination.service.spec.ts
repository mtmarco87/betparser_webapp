/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MatchPaginationService } from './match-pagination.service';

describe('Service: Pagination', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchPaginationService]
    });
  });

  it('should ...', inject([MatchPaginationService], (service: MatchPaginationService) => {
    expect(service).toBeTruthy();
  }));
});
