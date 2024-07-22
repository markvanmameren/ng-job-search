import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job, JobDetails } from '../../types/job.interface';
import { jobsUrl } from '../job/job.constants';

@Injectable({
  providedIn: 'root',
})
export class JobApiService {
  private httpClient = inject(HttpClient);

  public getAllJobs(): Observable<Job[]> {
    return this.httpClient.get<Job[]>(jobsUrl);
  }

  public getJobDetails(jobId: number): Observable<JobDetails> {
    return this.httpClient.get<JobDetails>(`${jobsUrl}/${jobId}`);
  }
}
