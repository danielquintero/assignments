import { Route } from '@angular/router';
import { FedexDashboardFeatureShellComponent } from './fedex-dashboard-feature-shell.component';
import { isAuthorizedGuard } from '@challenges/fedex-iam-util';

export const fedexDashboardFeatureShellRoutes: Route[] = [
  {
    path: '',
    component: FedexDashboardFeatureShellComponent,
    canActivate: [isAuthorizedGuard],
  },
];
