import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { GestionarSesionService } from '../../servicios/gestionar-sesion';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  sesionService = inject(GestionarSesionService);
  private router = inject(Router);

  ngOnInit() {
    if (!this.sesionService.usuarioActual()) {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion() {
    this.sesionService.logout();
    this.router.navigate(['/login']);
  }
}