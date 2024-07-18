import { Component, signal } from '@angular/core';
import { ALL_JOBS } from '../../../mocks';
import { JobCardsComponent } from '../job-cards/job-cards.component';

@Component({
  selector: 'app-favorite-jobs',
  standalone: true,
  imports: [JobCardsComponent],
  templateUrl: './favorite-jobs.component.html',
  styleUrl: './favorite-jobs.component.css',
})
export class FavoriteJobsComponent {
  favorites = signal(ALL_JOBS);
}
