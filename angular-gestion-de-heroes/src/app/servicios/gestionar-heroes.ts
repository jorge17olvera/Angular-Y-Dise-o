import { Service } from '@angular/core';
import { LISTAHEROES } from '../prueba-heroes';
import { Heroe } from "../heroe";
import { Observable, of } from "rxjs";

@Service()
export class GestionarHeroes {
    constructor(){ }
    getHeroes():Observable<Heroe[]>{
        return of(LISTAHEROES);
    }
    
}
