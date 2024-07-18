import { Component, Signal, signal } from '@angular/core';
import { ALL_JOBS } from '../../../mocks';
import { Job } from '../../types/job.interface';
import { JobCardsComponent } from '../job-cards/job-cards.component';

@Component({
  selector: 'app-all-jobs',
  standalone: true,
  imports: [JobCardsComponent],
  templateUrl: './all-jobs.component.html',
  styleUrl: './all-jobs.component.css',
})
export class AllJobsComponent {
  jobs: Signal<Job[]> = signal(ALL_JOBS);
}
