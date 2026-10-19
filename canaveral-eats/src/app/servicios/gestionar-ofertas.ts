import { Service, inject } from '@angular/core';
import { Oferta } from '../interfaces/oferta';
import { Observable,of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Service()
export class GestionarOfertas {
  private serviceUrl = '/json/ofertas.json';
  private http= inject(HttpClient);
  getOfertas():Observable<Oferta[]>{
    return this.http.get<Oferta[]>(this.serviceUrl);
  }
}
