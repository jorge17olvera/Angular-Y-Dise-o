import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GestionarSesionService } from '../../servicios/gestionar-sesion';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  sesionService = inject(GestionarSesionService);
  router = inject(Router);

  formularioLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  iniciarSesion() {
    if (this.formularioLogin.valid) {
      const email = this.formularioLogin.value.email!;
      const pass = this.formularioLogin.value.password!;

      const exito = this.sesionService.login(email, pass);

      if (exito) {
        this.router.navigate(['/dashboard']);
      } else {
        alert('Credenciales incorrectas');
      }
    } else {
      alert('Por favor, rellena el formulario correctamente.');
    }
  }
}
