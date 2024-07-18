import { Routes } from '@angular/router';
import { AllJobsComponent } from './components/all-jobs/all-jobs.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';

export const routes: Routes = [
  {
    path: 'jobs',
    component: AllJobsComponent,
    children: [
      {
        path: ':id',
        component: JobDetailComponent,
      },
    ],
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  {
    path: '**',
    redirectTo: 'jobs',
  },
];
