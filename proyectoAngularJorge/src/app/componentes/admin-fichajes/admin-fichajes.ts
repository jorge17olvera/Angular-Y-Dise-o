import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { GestionarSesionService } from '../../servicios/gestionar-sesion';

@Component({
  selector: 'app-admin-fichajes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './admin-fichajes.html',
  styleUrl: './admin-fichajes.css'
})
export class AdminFichajes implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  sesionService = inject(GestionarSesionService);

  private apiUrl = 'http://localhost:8080/api/fichajes.php';

  fichajes: any[] = [];
  empleados: any[] = [];
  editandoId: number | null = null;

  formularioFichaje = new FormGroup({
    usuario_id: new FormControl('', [Validators.required]),
    tipo: new FormControl('Entrada', [Validators.required]),
    fecha_hora: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    // Protección básica: si no es admin, redirige al dashboard
    if (this.sesionService.usuarioActual()?.rol !== 'admin') {
      this.router.navigate(['/dashboard']);
      return;
    }
    this.cargarEmpleados();
    this.cargarFichajes();
  }

  cargarEmpleados() {
    this.http.get<any[]>(`${this.apiUrl}?usuarios=1`).subscribe({
      next: (datos) => (this.empleados = datos)
    });
  }

  cargarFichajes() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (datos) => (this.fichajes = datos)
    });
  }

  guardarFichaje() {
    if (this.formularioFichaje.invalid) {
      alert('Completa todos los campos.');
      return;
    }

    const datos = this.formularioFichaje.value;

    if (this.editandoId !== null) {
      // MODO EDICIÓN (PUT)
      this.http.put<any>(this.apiUrl, { id: this.editandoId, ...datos }).subscribe({
        next: (res) => {
          if (res.exito) {
            this.cancelarEdicion();
            this.cargarFichajes();
          }
        }
      });
    } else {
      // MODO AÑADIR (POST)
      this.http.post<any>(this.apiUrl, datos).subscribe({
        next: (res) => {
          if (res.exito) {
            this.formularioFichaje.reset({ usuario_id: '', tipo: 'Entrada', fecha_hora: '' });
            this.cargarFichajes();
          }
        }
      });
    }
  }

  seleccionarParaEditar(fichaje: any) {
    this.editandoId = fichaje.id;
    // Convierte "YYYY-MM-DD HH:MM:SS" al formato "YYYY-MM-DDTHH:MM" que exige input datetime-local
    const fechaFormateada = fichaje.fecha_hora.replace(' ', 'T').slice(0, 16);
    this.formularioFichaje.patchValue({
      usuario_id: fichaje.usuario_id,
      tipo: fichaje.tipo,
      fecha_hora: fechaFormateada
    });
  }

  cancelarEdicion() {
    this.editandoId = null;
    this.formularioFichaje.reset({ usuario_id: '', tipo: 'Entrada', fecha_hora: '' });
  }

  eliminarFichaje(id: number) {
    if (!confirm('¿Seguro que quieres eliminar este fichaje?')) return;

    this.http.delete<any>(`${this.apiUrl}?id=${id}`).subscribe({
      next: (res) => {
        if (res.exito) {
          this.cargarFichajes();
        }
      }
    });
  }
}