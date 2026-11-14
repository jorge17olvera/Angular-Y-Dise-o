import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { GestionarSesionService } from '../../servicios/gestionar-sesion';
import { GestionarCarritoService } from '../../servicios/gestionar-carrito';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  sesionService = inject(GestionarSesionService);
  carritoService = inject(GestionarCarritoService);
  router = inject(Router);

  get mostrarMenu(): boolean {
    const url = this.router.url;
    const esRutaValida = !url.includes('/login') && !url.includes('/registro');

    const hayUsuario = this.sesionService.usuarioActual() !== null;

    return esRutaValida && hayUsuario;
  }

  cerrarSesion() {
    this.sesionService.usuarioActual.set(null as any); // Vaciamos la sesión
    this.router.navigate(['/login']);
  }
}
