import { Route } from '@angular/router';
import { CharactersOverviewComponent } from './characters-overview.component';

export const dashboardFeatureCharactersRoutes: Route[] = [
  { path: '', component: CharactersOverviewComponent },
];
