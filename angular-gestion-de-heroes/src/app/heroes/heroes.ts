import { Component } from '@angular/core';
import { Heroe } from '../heroe';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LISTAHEROES } from '../prueba-heoes';
import { HeroeDetalle } from '../heroe-detalle/heroe-detalle';

@Component({
  imports: [UpperCasePipe, FormsModule, HeroeDetalle],
  selector: 'app-heroes',
  styleUrl: './heroes.css',
  templateUrl: './heroes.html',
})
export class Heroes {
  heroe:Heroe[]=LISTAHEROES;
  selectedHeroe?: Heroe;
  onSelect(heroe:Heroe){
    this.selectedHeroe=heroe;
  }
}
