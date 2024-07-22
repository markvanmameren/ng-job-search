import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { JobService } from '../../services/job/job.service';
import { JobCardsComponent } from '../job-cards/job-cards.component';

@Component({
  selector: 'app-all-jobs',
  standalone: true,
  imports: [JobCardsComponent, AsyncPipe],
  templateUrl: './all-jobs.component.html',
  styleUrl: './all-jobs.component.css',
})
export class AllJobsComponent {
  jobService = inject(JobService);

  jobs = this.jobService.jobsWithFavorites;
}
