import { Component } from '@angular/core';
import { Ofertas } from '../ofertas/ofertas';
import { Destacados } from '../destacados/destacados';

@Component({
  imports: [Ofertas, Destacados],
  selector: 'app-aterrizaje',
  styleUrl: './aterrizaje.css',
  templateUrl: './aterrizaje.html',
})
export class Aterrizaje {}
