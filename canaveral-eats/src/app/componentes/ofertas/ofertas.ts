import { Component,inject, OnInit,signal } from '@angular/core';
import { GestionarOfertas } from '../../servicios/gestionar-ofertas';
import { Oferta } from '../../interfaces/oferta';
@Component({
  imports: [],
  selector: 'app-ofertas',
  styleUrl: './ofertas.css',
  templateUrl: './ofertas.html',
})
export class Ofertas implements OnInit{
  private gestionarOfertas=inject(GestionarOfertas);
  oferta=signal<Partial<Oferta>>({});
  ngOnInit(){
    this.getOferta();
  }
  getOferta(){
    this.gestionarOfertas.getOfertas()
        .subscribe(ofertas=>{
          this.oferta.set(ofertas[0]);
        })
  }

}
