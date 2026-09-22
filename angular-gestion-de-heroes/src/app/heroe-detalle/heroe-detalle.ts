import { Component, Input } from '@angular/core';
import { Heroe } from '../heroe';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [UpperCasePipe, FormsModule, HeroeDetalle],
  selector: 'app-heroe-detalle',
  styleUrl: './heroe-detalle.css',
  templateUrl: './heroe-detalle.html',
})
export class HeroeDetalle {
  @Input() heroe?:Heroe;
}
