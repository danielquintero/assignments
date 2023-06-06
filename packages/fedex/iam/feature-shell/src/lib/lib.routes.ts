import { Route } from '@angular/router';
import { FedexIamFeatureShellComponent } from './fedex-iam-feature-shell.component';

export const fedexIamFeatureShellRoutes: Route[] = [
  {
    path: 'sign-in',
    loadChildren: () =>
      import('@challenges/fedex-iam-sign-in').then(
        (m) => m.fedexIamFeatureSignInRoutes
      ),
  },
  {
    path: '',
    component: FedexIamFeatureShellComponent,
    children: [
      {
        path: 'sign-up',
        loadChildren: () =>
          import('@challenges/fedex-iam-sign-up').then(
            (m) => m.fedexIamFeatureSignUpRoutes
          ),
      },
    ],
  },
];
