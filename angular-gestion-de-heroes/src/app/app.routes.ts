import { Routes } from '@angular/router';
import { Heroes } from './heroes/heroes';
import { dashboard } from './dashboard/dashboard';

export const routes: Routes = [
    {path: 'heroes', component: Heroes},
    {path: 'dashboard', component: dashboard}
];
