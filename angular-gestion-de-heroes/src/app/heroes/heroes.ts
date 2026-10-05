import { Component, inject, OnInit } from '@angular/core';
import { Heroe } from '../heroe';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroeDetalle } from '../heroe-detalle/heroe-detalle';
import { GestionarHeroes } from '../servicios/gestionar-heroes';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from 'express';

@Component({
  imports: [UpperCasePipe, FormsModule, HeroeDetalle, RouterLink, RouterModule],
  selector: 'app-heroes',
  styleUrl: './heroes.css',
  templateUrl: './heroes.html',
})
export class Heroes implements OnInit {
  servicioGestionaHeroes=inject(GestionarHeroes)
  heroes?:Heroe[];
  router=inject(Router);
  selectedHeroe?: Heroe;
  constructor(){
    this.heroes=[];
  }

  getHeroes(): void {
     this.servicioGestionaHeroes.getHeroes().subscribe(heroes=>this.heroes=heroes);
  }
   ngOnInit() {
      this.getHeroes();
  }
  onSelect(heroe: Heroe): void {
   this.selectedHeroe = heroe;
 }

 mostrarDetalle(idHeroe:number){
      this.router.navigate(['/detalle',idHeroe]);
  }
}
