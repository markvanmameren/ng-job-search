import { AsyncPipe, DatePipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { JobDetails } from '../../interfaces/job.interface';
import { JobApiService } from '../../services/job-api/job-api.service';
import { PillsComponent } from '../pills/pills.component';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [AsyncPipe, DatePipe, PillsComponent],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css',
})
export class JobDetailComponent {
  location = inject(Location);
  activatedRoute = inject(ActivatedRoute);
  jobApiService = inject(JobApiService);

  job$: Observable<JobDetails | null> = this.activatedRoute.paramMap.pipe(
    map((paramMap) => paramMap.get('id')),
    switchMap((id) =>
      id === null ? of(null) : this.jobApiService.getJobDetails$(+id),
    ),
  );

  backButtonClicked(): void {
    this.location.back();
  }
}
