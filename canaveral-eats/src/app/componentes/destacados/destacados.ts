import { Component,inject, OnInit, signal } from '@angular/core';
import { GestionarDestacados } from '../../servicios/gestionar-destacados';
import { Producto} from '../../interfaces/producto';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [MatCardModule, MatButtonModule],
  selector: 'app-destacados',
  styleUrl: './destacados.css',
  templateUrl: './destacados.html',
})
export class Destacados implements OnInit{
  private gestionarDestacados = inject(GestionarDestacados);
  destacados=signal<Producto[]>([]);
  ngOnInit(){
    this.getDestacados();
  }
  getDestacados(){
    this.gestionarDestacados.getDestacados().subscribe(destacados=>{
      console.log(destacados);
      this.destacados.set(destacados);
    })
  }
}
