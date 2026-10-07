import { Component, inject } from '@angular/core';
import { GestionarDestacados } from '../../servicios/gestionar-destacados';
import { Producto } from '../../interfaces/producto';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [MatCardModule, MatButtonModule],
  selector: 'app-destacados',
  styleUrl: './destacados.css',
  templateUrl: './destacados.html',
})
export class Destacados {
  private gestionarDestacados=inject(GestionarDestacados);
  destacados?:Producto[];
  ngOnInit(){
    this.getDestacados();
  }
  getDestacados(){
    this.gestionarDestacados.getDestacados().subscribe(destacados=>{
      this.destacados= destacados;
    })
  }
}
