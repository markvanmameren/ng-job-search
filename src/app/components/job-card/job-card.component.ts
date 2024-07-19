import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobService } from '../../services/job/job.service';
import { Job } from '../../types/job.interface';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [FavoriteButtonComponent, RouterLink],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  jobService = inject(JobService);

  job = input.required<Job>();

  setFavorite(jobId: number, setTo: boolean): void {
    this.jobService.setFavorite(jobId, setTo);
  }
}
