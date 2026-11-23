import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminFichajes } from './admin-fichajes';

describe('AdminFichajes', () => {
  let component: AdminFichajes;
  let fixture: ComponentFixture<AdminFichajes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFichajes],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFichajes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
