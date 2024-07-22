import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobService } from '../../services/job/job.service';
import { Favorite, Job } from '../../types/job.interface';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [FavoriteButtonComponent, RouterLink],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  job = input.required<Job & Favorite>();

  jobService = inject(JobService);

  setFavorite(jobId: number, isFavorite: boolean): void {
    isFavorite
      ? this.jobService.addFavorite(jobId)
      : this.jobService.removeFavorite(jobId);
  }
}
