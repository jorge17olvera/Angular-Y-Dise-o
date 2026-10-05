import { Component, inject } from '@angular/core';
import { GestionarOfertas } from '../../servicios/gestionar-ofertas';
import { Oferta } from '../../interfaces/oferta';

@Component({
  imports: [],
  selector: 'app-ofertas',
  styleUrl: './ofertas.css',
  templateUrl: './ofertas.html',
})
export class Ofertas {
  private gestionarOfertas=inject(GestionarOfertas);
  oferta?:Oferta;

  ngOnInit(){
    this.getOferta();
  }

  getOferta(){
    this.gestionarOfertas.getOferta().subscribe(oferta=>this.oferta=oferta);
  }
}
