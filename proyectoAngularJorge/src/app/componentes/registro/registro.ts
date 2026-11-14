import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  router = inject(Router);
  http = inject(HttpClient);

  // Definición del formulario reactivo con sus validaciones
  formularioRegistro = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  registrar() {
    if (this.formularioRegistro.valid) {
      const nuevoUsuario = {
        accion: 'registro',
        nombre: this.formularioRegistro.value.nombre,
        email: this.formularioRegistro.value.email,
        password: this.formularioRegistro.value.password
      };

      // Enviamos la petición a PHP
      this.http.post<any>('http://localhost:8080/api/usuarios.php', nuevoUsuario)
        .subscribe({
          next: (respuesta) => {
            if (respuesta.exito) {
              alert('Registro completado con éxito. Ya puedes iniciar sesión.');
              this.router.navigate(['/login']);
            } else {
              alert(respuesta.mensaje); // Muestra error si el email ya existe
            }
          },
          error: (err) => {
            alert('Error: ' + (err.error?.mensaje || 'No se pudo registrar el usuario.'));
          }
        });
    } else {
      alert('Por favor, rellena todos los campos correctamente.');
    }
  }
}
