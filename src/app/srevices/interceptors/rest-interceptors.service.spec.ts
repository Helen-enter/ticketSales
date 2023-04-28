import { TestBed } from '@angular/core/testing';

import { RestInterceptorsServiceService } from './rest-interceptors.service';

describe('RestInterceptorsServiceService', () => {
  let service: RestInterceptorsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestInterceptorsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
