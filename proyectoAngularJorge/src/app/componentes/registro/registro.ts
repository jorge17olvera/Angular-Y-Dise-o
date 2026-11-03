import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  router = inject(Router);

  formularioRegistro = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  registrar() {
    if (this.formularioRegistro.valid) {
      console.log('Datos de registro:', this.formularioRegistro.value);
      alert('Registro simulado con éxito');
      this.router.navigate(['/login']);
    } else {
      alert('Revisa los campos del formulario');
    }
  }
}
