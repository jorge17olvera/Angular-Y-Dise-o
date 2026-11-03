import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Fichaje } from '../../interfaces/fichaje';

@Component({
  selector: 'app-fichaje-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fichaje-detalle.html',
  styleUrl: './fichaje-detalle.css'
})
export class FichajeDetalle implements OnInit {
  route = inject(ActivatedRoute);

  fichajeId: string | null = null;
  fichajeSeleccionado: Fichaje | null = null;

  ngOnInit() {
    this.fichajeId = this.route.snapshot.paramMap.get('id');
    if (this.fichajeId) {
      this.cargarDetallesFichaje(Number(this.fichajeId));
    }
  }

  cargarDetallesFichaje(id: number) {
    const baseDatosSimulada: Fichaje[] = [
      { id: 1, fecha: '2026-11-01', horaEntrada: '08:00', horaSalida: '15:00' },
      { id: 2, fecha: '2026-11-02', horaEntrada: '08:15', horaSalida: '14:45' },
      { id: 3, fecha: '2026-11-03', horaEntrada: '07:55', horaSalida: null }
    ];

    const encontrado = baseDatosSimulada.find(f => f.id === id);
    if (encontrado) {
      this.fichajeSeleccionado = encontrado;
    }
  }
}
