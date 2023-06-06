import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'iam',
    loadChildren: () =>
      import('@challenges/fedex-iam-shell').then(
        (m) => m.fedexIamFeatureShellRoutes
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@challenges/fedex-dashboard').then(
        (m) => m.fedexDashboardFeatureShellRoutes
      ),
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];
