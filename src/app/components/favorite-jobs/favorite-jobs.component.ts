import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { JobService } from '../../services/job/job.service';
import { JobCardsComponent } from '../job-cards/job-cards.component';

@Component({
  selector: 'app-favorite-jobs',
  standalone: true,
  imports: [JobCardsComponent, AsyncPipe],
  templateUrl: './favorite-jobs.component.html',
  styleUrl: './favorite-jobs.component.css',
})
export class FavoriteJobsComponent {
  jobService = inject(JobService);

  favorites$ = this.jobService.getFavoriteJobs();
}
