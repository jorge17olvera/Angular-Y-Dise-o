import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  imports: [MatButtonModule, MatMenuModule],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {
  private router=inject(Router);
  mostrarOfertas(){
    this.router.navigate(["/ofertas"]);
  }
}
