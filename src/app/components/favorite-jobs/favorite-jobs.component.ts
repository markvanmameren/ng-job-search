import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobService } from '../../services/job/job.service';
import { JobCardsComponent } from '../job-cards/job-cards.component';

@Component({
  selector: 'app-favorite-jobs',
  standalone: true,
  imports: [JobCardsComponent, RouterLink],
  templateUrl: './favorite-jobs.component.html',
  styleUrl: './favorite-jobs.component.css',
})
export class FavoriteJobsComponent {
  jobService = inject(JobService);

  favorites = this.jobService.favoriteJobs;
}
