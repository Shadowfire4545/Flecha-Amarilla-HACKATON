import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'facturar',
    loadComponent: () => import('./facturar/features/facturar.component'),
  },
  {
    path: '**',
    redirectTo: 'facturar',
  },
];
