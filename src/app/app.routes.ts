import { Routes } from '@angular/router';
import { activateHome, activateLogin } from './shared/data-access/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/features/home.component'),
    canActivate: [activateHome],
  },
  {
    path: 'login',
    loadComponent: () => import('./login/features/login.component'),
    canActivate: [activateLogin],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
