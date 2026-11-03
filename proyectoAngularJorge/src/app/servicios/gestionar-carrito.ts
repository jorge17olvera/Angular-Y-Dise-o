import { Injectable, signal } from '@angular/core';
import { ItemCarrito } from '../interfaces/carrito';
import { Prenda } from '../interfaces/prenda';

@Injectable({
  providedIn: 'root'
})
export class GestionarCarritoService {
  // Signal para almacenar la lista de elementos en el carrito
  items = signal<ItemCarrito[]>([]);

  agregarAlCarrito(prenda: Prenda, talla: string) {
    const listaActual = this.items();
    const index = listaActual.findIndex(
      item => item.prenda.id === prenda.id && item.tallaSeleccionada === talla
    );

    if (index >= 0) {
      const nuevaLista = [...listaActual];
      nuevaLista[index].cantidad += 1;
      this.items.set(nuevaLista);
    } else {
      this.items.set([...listaActual, { prenda, tallaSeleccionada: talla, cantidad: 1 }]);
    }
  }

  vaciarCarrito() {
    this.items.set([]);
  }
}
