import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FichajeDetalle } from './fichaje-detalle';

describe('FichajeDetalle', () => {
  let component: FichajeDetalle;
  let fixture: ComponentFixture<FichajeDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichajeDetalle],
    }).compileComponents();

    fixture = TestBed.createComponent(FichajeDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
