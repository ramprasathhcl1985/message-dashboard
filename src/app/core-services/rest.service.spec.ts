import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import { RestService } from './rest.service';

describe('RestService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: RestService<any> = TestBed.get(RestService);
    expect(service).toBeTruthy();
  });
});
