import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';

export const appRoutes: Route[] = [
  {
    path: 'list',
    loadChildren: () =>
      loadRemoteModule('list', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'detail',
    loadChildren: () =>
      loadRemoteModule('detail', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
];
