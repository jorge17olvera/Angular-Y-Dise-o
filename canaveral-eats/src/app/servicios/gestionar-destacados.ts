import { inject, Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto} from '../interfaces/producto';
import { HttpClient, HttpHeaders }   from '@angular/common/http';

@Service()
export class GestionarDestacados {
  private serviceUrl = '/json/productos.json';
  private http= inject(HttpClient);

  getDestacados():Observable<Producto[]>{
    const headers = new HttpHeaders({
     'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    return this.http.get<Producto[]>(this.serviceUrl,{headers})
  }
}
