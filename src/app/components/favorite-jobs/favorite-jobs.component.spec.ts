import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ALL_JOBS } from '../../../mocks';
import { Favorite, Job } from '../../interfaces/job.interface';
import { JobService } from '../../services/job/job.service';
import { FavoriteJobsComponent } from './favorite-jobs.component';

describe('FavoriteJobsComponent', () => {
  let component: FavoriteJobsComponent;
  let fixture: ComponentFixture<FavoriteJobsComponent>;

  let mockFavorites: WritableSignal<Array<Job & Favorite>>;
  let jobServiceSpy: jasmine.SpyObj<JobService>;

  beforeEach(async () => {
    mockFavorites = signal(
      ALL_JOBS.map((job) => ({ ...job, isFavorite: false })),
    );
    jobServiceSpy = jasmine.createSpyObj<JobService>(
      'JobService',
      {},
      { favoriteJobs: mockFavorites },
    );

    await TestBed.configureTestingModule({
      imports: [FavoriteJobsComponent],
      providers: [
        { provide: JobService, useValue: jobServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a job cards component if there are favorites', () => {
    // favorites by default

    const jobCards = fixture.nativeElement.querySelector('app-job-cards');

    expect(jobCards).toBeInstanceOf(HTMLElement);
  });

  it('should render a no-favorites element if there are NO favorites', () => {
    mockFavorites.set([]);
    fixture.detectChanges();

    const noFavorites = fixture.nativeElement.querySelector('.no-favorites');

    expect(noFavorites).toBeInstanceOf(HTMLParagraphElement);
  });
});
