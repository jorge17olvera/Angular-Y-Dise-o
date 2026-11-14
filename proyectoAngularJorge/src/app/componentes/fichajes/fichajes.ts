import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GestionarSesionService } from '../../servicios/gestionar-sesion';

@Component({
  selector: 'app-fichajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fichajes.html',
  styleUrl: './fichajes.css'
})
export class Fichajes implements OnInit {
  http = inject(HttpClient);
  sesionService = inject(GestionarSesionService);

  historialFichajes: any[] = [];

  ngOnInit() {
    this.cargarFichajes();
  }

  cargarFichajes() {
    const usuario = this.sesionService.usuarioActual();
    if (usuario) {
      // Pedimos por GET los fichajes de este usuario concreto
      this.http.get<any>(`http://localhost:8080/api/fichajes.php?usuario_id=${usuario.id}`)
        .subscribe({
          next: (respuesta) => {
            if (respuesta.exito) {
              this.historialFichajes = respuesta.fichajes;
            }
          },
          error: (err) => console.error('Error al cargar fichajes', err)
        });
    }
  }

  fichar(tipo: 'entrada' | 'salida') {
    const usuario = this.sesionService.usuarioActual();
    if (usuario) {
      const datos = {
        usuario_id: usuario.id,
        tipo: tipo
      };

      // Enviamos el POST para registrar la acción
      this.http.post<any>('http://localhost:8080/api/fichajes.php', datos)
        .subscribe({
          next: (respuesta) => {
            if (respuesta.exito) {
              alert(`Fichaje de ${tipo} registrado correctamente.`);
              this.cargarFichajes(); // Recargamos la lista automáticamente
            }
          },
          error: (err) => alert('Error al registrar el fichaje.')
        });
    }
  }
}
