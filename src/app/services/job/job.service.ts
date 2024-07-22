import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Favorite, Job } from '../../interfaces/job.interface';
import { JobApiService } from '../job-api/job-api.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobApiService = inject(JobApiService);
  private localStorageService = inject(LocalStorageService);

  private favoriteJobIds = signal<number[]>(
    this.localStorageService.readFavoriteJobIds(),
  );

  private jobsSignal = toSignal(this.jobApiService.getAllJobs(), {
    initialValue: [],
  });

  public jobs = computed<Array<Job & Favorite>>(() =>
    this.jobsSignal().map(this.combine),
  );

  public favoriteJobs = computed<Array<Job & Favorite>>(() =>
    this.jobs().filter((job) => job.isFavorite),
  );

  constructor() {
    effect(() => {
      this.localStorageService.writeFavoriteJobIds(this.favoriteJobIds());
    });
  }

  public addFavorite(jobIdToAdd: number): void {
    if (this.isFavoriteJob(jobIdToAdd)) return;

    this.favoriteJobIds.update((jobIds) => [...jobIds, jobIdToAdd]);
  }

  public removeFavorite(jobIdToRemove: number): void {
    if (!this.isFavoriteJob(jobIdToRemove)) return;

    this.favoriteJobIds.update((jobIds) =>
      jobIds.filter((jobId) => jobId !== jobIdToRemove),
    );
  }

  public isFavoriteJob = (jobId: number): boolean =>
    this.favoriteJobIds().includes(jobId);

  private combine = <T extends Job>(job: T): T & Favorite =>
    this.isFavoriteJob(job.id)
      ? { ...job, isFavorite: true }
      : { ...job, isFavorite: false };
}
