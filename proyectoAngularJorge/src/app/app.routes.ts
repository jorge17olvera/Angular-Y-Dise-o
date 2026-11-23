import { Routes } from '@angular/router';
import { Login } from './componentes/login/login';
import { Registro } from './componentes/registro/registro';
import { Dashboard } from './componentes/dashboard/dashboard';
import { Fichajes } from './componentes/fichajes/fichajes';
import { FichajeDetalle } from './componentes/fichaje-detalle/fichaje-detalle';
import { Ropa } from './componentes/ropa/ropa';
import { Carrito } from './componentes/carrito/carrito';
import { AdminFichajes } from './componentes/admin-fichajes/admin-fichajes';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'dashboard', component: Dashboard },
  { path: 'fichajes', component: Fichajes },
  { path: 'fichajes/:id', component: FichajeDetalle },
  { path: 'ropa', component: Ropa },
  { path: 'carrito', component: Carrito },
  { path: 'admin-fichajes', component: AdminFichajes },
  { path: '**', redirectTo: 'login' }
];