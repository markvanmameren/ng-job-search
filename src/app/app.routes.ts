import { Routes } from '@angular/router';
import { AllJobsComponent } from './components/all-jobs/all-jobs.component';
import { FavoriteJobsComponent } from './components/favorite-jobs/favorite-jobs.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';

export const routes: Routes = [
  {
    path: 'jobs/:id',
    component: JobDetailComponent,
  },
  {
    path: 'jobs',
    component: AllJobsComponent,
  },
  {
    path: 'favorites',
    component: FavoriteJobsComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'jobs',
  },
];
