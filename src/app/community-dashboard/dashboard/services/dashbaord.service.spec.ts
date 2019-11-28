import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashbaord.service';
import { HttpClient } from '@angular/common/http';

describe('DashbaordService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClient],
  }));

  it('should be created', () => {
    const service: DashboardService = TestBed.get(DashboardService);
    expect(service).toBeTruthy();
  });
});
