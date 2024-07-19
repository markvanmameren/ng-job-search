import { AsyncPipe, DatePipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { JobService } from '../../services/job/job.service';
import { DetailedJob } from '../../types/job.interface';
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
  jobService = inject(JobService);

  job$: Observable<DetailedJob | null> = this.activatedRoute.paramMap.pipe(
    map((paramMap) => paramMap.get('id')),
    switchMap((id) =>
      id === null ? of(null) : this.jobService.getJobDetail(id)
    )
  );

  backButtonClicked(): void {
    this.location.back();
  }
}
