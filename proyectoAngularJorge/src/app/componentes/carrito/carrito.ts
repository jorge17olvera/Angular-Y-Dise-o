import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionarCarritoService } from '../../servicios/gestionar-carrito';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito {
  // Inyectamos el servicio para poder acceder a los productos
  carritoService = inject(GestionarCarritoService);

  // Calculamos el precio total sumando el precio de cada prenda
  get totalPedido() {
    return this.carritoService.items().reduce((suma, prenda) => suma + parseFloat(prenda.precio), 0);
  }

  realizarPedido() {
    if (this.carritoService.items().length > 0) {
      alert('¡Pedido enviado correctamente a tu empresa!');
      this.carritoService.vaciarCarrito(); // Vaciamos el carrito tras comprar
    }
  }
}
