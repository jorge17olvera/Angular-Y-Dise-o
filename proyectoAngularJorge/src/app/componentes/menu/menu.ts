import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { GestionarSesionService } from '../../servicios/gestionar-sesion';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  sesionService = inject(GestionarSesionService);
  router = inject(Router);

  cerrarSesion() {
    this.sesionService.logout();
    this.router.navigate(['/login']);
  }
}
