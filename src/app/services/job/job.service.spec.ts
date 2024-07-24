import { TestBed } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';
import { ALL_JOBS } from '../../../mocks';
import { Favorite, Job } from '../../interfaces/job.interface';
import { JobApiService } from '../job-api/job-api.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { JobService } from './job.service';

describe('JobService', () => {
  let service: JobService;

  let initialFavoriteJobIds: number[];
  let newFavoriteJobId: number;
  let existingFavoriteJobId: number;
  let jobsSubject: BehaviorSubject<Job[]>;

  let jobApiServiceSpy: jasmine.SpyObj<JobApiService>;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    initialFavoriteJobIds = [ALL_JOBS[1].id, ALL_JOBS[3].id, ALL_JOBS[5].id];
    existingFavoriteJobId = ALL_JOBS[1].id;
    newFavoriteJobId = ALL_JOBS[7].id;
    jobsSubject = new BehaviorSubject<Job[]>(ALL_JOBS);

    jobApiServiceSpy = jasmine.createSpyObj(JobApiService, {
      getAllJobs$: jobsSubject.asObservable(),
    });
    localStorageServiceSpy = jasmine.createSpyObj(LocalStorageService, {
      readFavoriteJobIds: initialFavoriteJobIds,
      writeFavoriteJobIds: undefined,
    });

    TestBed.configureTestingModule({
      providers: [
        { provide: JobApiService, useValue: jobApiServiceSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
      ],
    });
    service = TestBed.inject(JobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('effect', () => {
    it('should write to local storage', () => {
      const expected = [...initialFavoriteJobIds, newFavoriteJobId];

      service.addFavorite(newFavoriteJobId);
      TestBed.flushEffects();

      expect(
        localStorageServiceSpy.writeFavoriteJobIds,
      ).toHaveBeenCalledOnceWith(expected);
    });
  });

  describe('jobsWithFavorites', () => {
    it('should combine all the jobs from the API with the job-ids from local storage', () => {
      const expected: Array<Job & Favorite> = ALL_JOBS.map((job) =>
        initialFavoriteJobIds.includes(job.id)
          ? { ...job, isFavorite: true }
          : { ...job, isFavorite: false },
      );

      const actual = service.jobsWithFavorites();

      expect(actual).toEqual(expected);
    });
  });

  describe('favoriteJobs', () => {
    it('should only contain jobs from the API that have a matching id in local storage', () => {
      const expected: Array<Job & Favorite> = ALL_JOBS.filter((job) =>
        initialFavoriteJobIds.includes(job.id),
      ).map((job) => ({ ...job, isFavorite: true }));

      const actual = service.favoriteJobs();

      expect(actual).toEqual(expected);
    });
  });

  describe('adding and removing favorites', () => {
    let initialJobsWithFavorites: Array<Job & Favorite>;
    let initialFavoriteJobs: Array<Job & Favorite>;

    beforeEach(() => {
      initialJobsWithFavorites = service.jobsWithFavorites();
      initialFavoriteJobs = service.favoriteJobs();
    });

    describe('addFavorite', () => {
      describe('when the job is already a favorite', () => {
        beforeEach(() => {
          service.addFavorite(existingFavoriteJobId);
        });

        it('should NOT update the jobsWithFavorites signal', () => {
          const actual = service.jobsWithFavorites();

          expect(actual).toEqual(initialJobsWithFavorites);
        });

        it('should NOT update the favoriteJobs signal', () => {
          const actual = service.favoriteJobs();

          expect(actual).toEqual(initialFavoriteJobs);
        });
      });

      describe('when the job is NOT a favorite', () => {
        beforeEach(() => {
          service.addFavorite(newFavoriteJobId);
        });

        it('should update the jobsWithFavorites signal', () => {
          const expected = ALL_JOBS.map((job) =>
            job.id === ALL_JOBS[1].id ||
            job.id === ALL_JOBS[3].id ||
            job.id === ALL_JOBS[5].id ||
            job.id === ALL_JOBS[7].id
              ? { ...job, isFavorite: true }
              : { ...job, isFavorite: false },
          );

          const actual = service.jobsWithFavorites();

          expect(actual).toEqual(expected);
        });

        it('should update the favoriteJobs signal', () => {
          const expected = [
            ALL_JOBS[1],
            ALL_JOBS[3],
            ALL_JOBS[5],
            ALL_JOBS[7],
          ].map((job) => ({ ...job, isFavorite: true }));

          const actual = service.favoriteJobs();

          expect(actual).toEqual(expected);
        });
      });
    });

    describe('removeFavorite', () => {
      describe('when the job is a favorite', () => {
        beforeEach(() => {
          service.removeFavorite(existingFavoriteJobId);
        });

        it('should update the jobsWithFavorites signal', () => {
          const expected = ALL_JOBS.map((job) =>
            job.id === ALL_JOBS[3].id || job.id === ALL_JOBS[5].id
              ? { ...job, isFavorite: true }
              : { ...job, isFavorite: false },
          );

          const actual = service.jobsWithFavorites();

          expect(actual).toEqual(expected);
        });

        it('should update the favoriteJobs signal', () => {
          const expected = [ALL_JOBS[3], ALL_JOBS[5]].map((job) => ({
            ...job,
            isFavorite: true,
          }));

          const actual = service.favoriteJobs();

          expect(actual).toEqual(expected);
        });
      });

      describe('when the job is NOT a favorite', () => {
        beforeEach(() => {
          service.removeFavorite(newFavoriteJobId);
        });

        it('should NOT update the jobsWithFavorites signal', () => {
          const actual = service.jobsWithFavorites();

          expect(actual).toEqual(initialJobsWithFavorites);
        });

        it('should NOT update the favoriteJobs signal', () => {
          const actual = service.favoriteJobs();

          expect(actual).toEqual(initialFavoriteJobs);
        });
      });
    });
  });

  describe('isFavoriteJob', () => {
    it('should return true when the job-id is a favorite', () => {
      const actual = service.isFavoriteJob(existingFavoriteJobId);

      expect(actual).toBeTrue();
    });
    it('should return false when the job-id is NOT a favorite', () => {
      const actual = service.isFavoriteJob(newFavoriteJobId);

      expect(actual).toBeFalse();
    });
  });
});
