import { TestBed } from '@angular/core/testing';
import { GestionarOfertas } from './gestionar-ofertas';

describe('GestionarOfertas', () => {
  let service: GestionarOfertas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionarOfertas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
