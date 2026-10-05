import { Routes } from '@angular/router';
import { Heroes } from './heroes/heroes';
import { dashboard } from './dashboard/dashboard';
import { HeroeDetalle } from './heroe-detalle/heroe-detalle';

export const routes: Routes = [
    {path: 'heroes', component: Heroes},
    {path: 'dashboard', component: dashboard},
    {path: 'detalle:id', component: HeroeDetalle},
    {path: '', redirectTo: '/dashboard', pathMatch:'full'}
];
