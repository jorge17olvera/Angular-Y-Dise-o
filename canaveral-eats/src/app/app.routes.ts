import { Routes } from '@angular/router';
import { Ofertas } from './componentes/ofertas/ofertas';
import { Aterrizaje } from './componentes/aterrizaje/aterrizaje';

export const routes: Routes = [
    {path:"ofertas", component:Ofertas},
    {path:"", component:Aterrizaje}
];
