import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Aterrizaje } from './aterrizaje';

describe('Aterrizaje', () => {
  let component: Aterrizaje;
  let fixture: ComponentFixture<Aterrizaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aterrizaje],
    }).compileComponents();

    fixture = TestBed.createComponent(Aterrizaje);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
