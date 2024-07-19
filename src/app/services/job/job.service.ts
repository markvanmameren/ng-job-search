import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { DetailedJob, Job } from '../../types/job.interface';
import { LocalStorageService } from '../local-storage/local-storage.service';

const jobsUrl = '/jobs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private httpClient = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);

  public getAllJobs(): Observable<Job[]> {
    return this.httpClient.get<Job[]>(jobsUrl);
  }

  public getFavoriteJobs(): Observable<Job[]> {
    return combineLatest([
      this.getAllJobs(),
      this.localStorageService.favoriteIds$,
    ]).pipe(
      map(([jobs, favoriteIds]) =>
        jobs.filter((job) => favoriteIds.includes(job.id))
      )
    );
  }

  public getJobDetail(jobId: string): Observable<DetailedJob> {
    return this.httpClient.get<DetailedJob>(`${jobsUrl}/${jobId}`);
  }

  public setFavorite(jobId: number, setTo: boolean) {
    setTo
      ? this.localStorageService.saveFavoriteId(jobId)
      : this.localStorageService.removeFavoriteId(jobId);
  }
}
