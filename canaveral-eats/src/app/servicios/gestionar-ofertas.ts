import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Oferta } from '../interfaces/oferta';

@Service()
export class GestionarOfertas {
    private LISTAOFERTAS:Oferta[]=[
        {id:1, imagen:"foto1.png", descripcion:"Oferta numero 1"},
        {id:2, imagen:"foto2.png", descripcion:"Oferta numero 2"},
        {id:3, imagen:"foto3.png", descripcion:"Oferta numero 3"}
    ]
    getOferta():Observable<Oferta>{
        return of(this.LISTAOFERTAS[0]);
    }
}
