import { Component, inject } from '@angular/core';
import { Heroe } from '../heroe';
import { GestionarHeroes } from '../servicios/gestionar-heroes';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: [ './dashboardcss' ]
})
export class dashboard implements OnInit {
  heroes?:Heroe[];
  private gestionarHeroes=inject(GestionarHeroes);

  constructor(){
    this.heroes=[];
  }

  getHeroes(): void {
     this.servicioGestionaHeroes.getHeroes().subscribe(heroes=>this.heroes=heroes.slice(0,4));
  }
   ngOnInit() {
      this.getHeroes();
  }
  
}