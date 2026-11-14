import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GestionarSesionService } from '../../servicios/gestionar-sesion';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  router = inject(Router);
  sesionService = inject(GestionarSesionService);
  http = inject(HttpClient);

  formularioLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  iniciarSesion() {
    if (this.formularioLogin.valid) {
      const credenciales = {
        accion: 'login',
        email: this.formularioLogin.value.email,
        password: this.formularioLogin.value.password
      };

      // Enviamos la petición a PHP
      this.http.post<any>('http://localhost:8080/api/usuarios.php', credenciales)
        .subscribe({
          next: (respuesta) => {
            if (respuesta.exito) {
              this.sesionService.usuarioActual.set(respuesta.usuario);
              this.router.navigate(['/dashboard']);
            }
          },
          error: (err) => {
            alert('Usuario o contraseña incorrectos.');
          }
        });
    } else {
      alert('Por favor, rellena todos los campos correctamente.');
    }
  }
}
