import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Fichaje } from '../../interfaces/fichaje';

@Component({
  selector: 'app-fichajes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fichajes.html',
  styleUrl: './fichajes.css'
})
export class Fichajes {
  // Datos simulados temporales hasta que hagamos la petición HTTP a PHP
  listaFichajes: Fichaje[] = [
    { id: 1, fecha: '2026-11-01', horaEntrada: '08:00', horaSalida: '15:00' },
    { id: 2, fecha: '2026-11-02', horaEntrada: '08:15', horaSalida: '14:45' },
    { id: 3, fecha: '2026-11-03', horaEntrada: '07:55', horaSalida: null } // Fichaje en curso
  ];

  ficharEntrada() {
    alert('Simulación: Se registrará la entrada en la base de datos.');
  }

  ficharSalida(id: number) {
    alert('Simulación: Se registrará la salida para el fichaje ' + id);
  }
}
