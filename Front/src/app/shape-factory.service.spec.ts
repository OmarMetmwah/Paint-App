import { TestBed } from '@angular/core/testing';

import { ShapeFactoryService } from './shape-factory.service';

describe('ShapeFactoryService', () => {
  let service: ShapeFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShapeFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
