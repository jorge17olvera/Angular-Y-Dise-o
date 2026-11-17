import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class GestionarSesionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/usuarios.php';

  // Signal que guarda el usuario logueado o null si no hay sesión iniciada
  usuarioActual = signal<Usuario | null>(null);

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      accion: 'login',
      email: email,
      password: password
    }).pipe(
      tap(respuesta => {
        if (respuesta.exito && respuesta.usuario) {
          this.usuarioActual.set(respuesta.usuario);
        }
      })
    );
  }

  registro(nombre: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      accion: 'registro',
      nombre: nombre,
      email: email,
      password: password
    });
  }

  logout() {
    this.usuarioActual.set(null);
  }
}