import { Component, input } from '@angular/core';
import { Favorite, Job } from '../../interfaces/job.interface';
import { JobCardComponent } from '../job-card/job-card.component';

@Component({
  selector: 'app-job-cards',
  standalone: true,
  imports: [JobCardComponent],
  templateUrl: './job-cards.component.html',
  styleUrl: './job-cards.component.css',
})
export class JobCardsComponent {
  jobs = input.required<Array<Job & Favorite>>();
}
