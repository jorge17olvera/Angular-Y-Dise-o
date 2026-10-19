import { Component } from '@angular/core';
import { Destacados } from '../destacados/destacados';
import { Ofertas } from '../ofertas/ofertas';

@Component({
  imports: [Destacados, Ofertas],
  selector: 'app-aterrizaje',
  styleUrl: './aterrizaje.css',
  templateUrl: './aterrizaje.html',
})
export class Aterrizaje {}
