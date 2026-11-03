import { Routes } from '@angular/router';
import { Login } from './componentes/login/login';
import { Registro } from './componentes/registro/registro';
import { Dashboard } from './componentes/dashboard/dashboard';
import { Fichajes } from './componentes/fichajes/fichajes';
import { FichajeDetalle } from './componentes/fichaje-detalle/fichaje-detalle';
import { Ropa } from './componentes/ropa/ropa';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'dashboard', component: Dashboard },
  { path: 'fichajes', component: Fichajes },
  { path: 'fichajes/:id', component: FichajeDetalle },
  { path: 'ropa', component: Ropa },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
