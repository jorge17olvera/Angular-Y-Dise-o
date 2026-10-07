import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import{Producto} from '../interfaces/producto';

@Service()
export class GestionarDestacados {
    LISTADESTACADOS:Producto[]=[
  {
    "id": 1,
    "imagenSmall": "https://example.com/images/producto-1-small.jpg",
    "imagenGrande": "https://example.com/images/producto-1-large.jpg",
    "descripcion": "Auriculares inalámbricos con cancelación de ruido.",
    "precio": 59.99,
    "valoracion": 4.5
  },
  {
    "id": 2,
    "imagenSmall": "https://example.com/images/producto-2-small.jpg",
    "imagenGrande": "https://example.com/images/producto-2-large.jpg",
    "descripcion": "Reloj inteligente con monitorización deportiva y de salud.",
    "precio": 129.99,
    "valoracion": 4.7
  },
  {
    "id": 3,
    "imagenSmall": "https://example.com/images/producto-3-small.jpg",
    "imagenGrande": "https://example.com/images/producto-3-large.jpg",
    "descripcion": "Teclado mecánico compacto con iluminación RGB.",
    "precio": 74.95,
    "valoracion": 4.3
  },
  {
    "id": 4,
    "imagenSmall": "https://example.com/images/producto-4-small.jpg",
    "imagenGrande": "https://example.com/images/producto-4-large.jpg",
    "descripcion": "Mochila urbana resistente para portátil de hasta 15 pulgadas.",
    "precio": 45.5,
    "valoracion": 4.6
  },
  {
    "id": 5,
    "imagenSmall": "https://example.com/images/producto-5-small.jpg",
    "imagenGrande": "https://example.com/images/producto-5-large.jpg",
    "descripcion": "Botella térmica de acero inoxidable de 750 ml.",
    "precio": 24.9,
    "valoracion": 4.8
  }
]
    getDestacados():Observable<Producto[]>{
        return of(this.LISTADESTACADOS);
    }
}
