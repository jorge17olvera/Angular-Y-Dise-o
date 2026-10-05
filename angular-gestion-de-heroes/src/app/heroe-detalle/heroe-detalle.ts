import { Component,inject, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Heroe }  from '../heroe';
import { GestionarHeroes }  from '../servicios/gestionar-heroes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-heroe-detalle',
  imports: [FormsModule,UpperCasePipe],
  templateUrl: './heroe-detalle.html',
  styleUrls: [ './heroe-detalle.css' ]
})
export class HeroeDetalle implements OnInit{
  heroe: Heroe | undefined;
 private route = inject(ActivatedRoute);
 private gestionarHeroes = inject(GestionarHeroes);
 private location = inject(Location)
 

  constructor( ) {}

  ngOnInit(): void {
    this.route.params.subscribe( params => this.getHeroe());
  }

  getHeroe(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gestionarHeroes.getHeroe(id)
      .subscribe(heroe => this.heroe = heroe);
  }

  goBack(): void {
    this.location.back();
  }
}