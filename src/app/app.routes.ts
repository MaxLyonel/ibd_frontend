import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/acceso'},
  { path: 'acceso', loadComponent: () => import('./components/login/login.component')},
  { path: 'ibd', loadChildren: () => import('./components/ibd/ibd.routes').then(m => m.IBD)},
];
