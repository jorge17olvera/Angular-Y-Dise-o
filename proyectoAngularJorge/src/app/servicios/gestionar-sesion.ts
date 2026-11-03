import { Injectable, signal } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class GestionarSesionService {
  // Signal que guarda el usuario logueado o null si no hay sesión iniciada
  usuarioActual = signal<Usuario | null>(null);

  login(email: string, pass: string): boolean {
    // Datos de prueba temporales hasta que conectemos con tu API PHP
    if (email === 'admin@empresa.com' && pass === '1234') {
      this.usuarioActual.set({ id: 1, nombre: 'Administrador', email: email, rol: 'admin' });
      return true;
    } else if (email === 'empleado@empresa.com' && pass === '1234') {
      this.usuarioActual.set({ id: 2, nombre: 'Jorge', email: email, rol: 'empleado' });
      return true;
    }
    return false; // Credenciales incorrectas
  }

  logout() {
    this.usuarioActual.set(null);
  }
}
