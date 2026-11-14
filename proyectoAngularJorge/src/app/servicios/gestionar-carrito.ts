import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestionarCarritoService {
  // Signal que guarda los productos elegidos
  items = signal<any[]>([]);

  agregarPrenda(prenda: any) {
    this.items.update(prendas => [...prendas, prenda]);
    alert(`${prenda.nombre} añadido al carrito 🛒`);
  }

  vaciarCarrito() {
    this.items.set([]);
  }
}
