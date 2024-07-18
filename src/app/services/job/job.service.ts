import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailedJob, Job } from '../../types/job.interface';

const jobsUrl = '/jobs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private httpClient = inject(HttpClient);

  public getAllJobs(): Observable<Job[]> {
    return this.httpClient.get<Job[]>(jobsUrl);
  }

  public getJobDetail(jobId: string): Observable<DetailedJob> {
    return this.httpClient.get<DetailedJob>(`${jobsUrl}/${jobId}`);
  }
}
