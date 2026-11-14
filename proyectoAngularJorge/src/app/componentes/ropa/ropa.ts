import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GestionarCarritoService } from '../../servicios/gestionar-carrito';

@Component({
  selector: 'app-ropa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ropa.html',
  styleUrl: './ropa.css'
})
export class Ropa implements OnInit {
  http = inject(HttpClient);
  carritoService = inject(GestionarCarritoService);

  // Convertimos el catálogo en una Signal para que el HTML se actualice al instante
  catalogo = signal<any[]>([]);

  ngOnInit() {
    this.http.get<any>('http://localhost:8080/api/prendas.php')
      .subscribe({
        next: (respuesta) => {
          if (respuesta.exito) {
            // Guardamos los datos en la Signal
            this.catalogo.set(respuesta.prendas);
          }
        },
        error: (err) => console.error('Error al cargar la ropa', err)
      });
  }

  anadirAlCarrito(prenda: any) {
    this.carritoService.agregarPrenda(prenda);
  }
}
