import { TestBed } from '@angular/core/testing';
import { GestionarDestacados } from './gestionar-destacados';

describe('GestionarDestacados', () => {
  let service: GestionarDestacados;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionarDestacados);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
