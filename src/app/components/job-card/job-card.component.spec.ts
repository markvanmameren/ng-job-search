import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { ALL_JOBS } from '../../../mocks';
import { Favorite, Job } from '../../interfaces/job.interface';
import { JobService } from '../../services/job/job.service';
import { setComponentInput } from '../../testing/utilities/set-component-input.util';
import { JobCardComponent } from './job-card.component';

describe('JobCardComponent', () => {
  let component: JobCardComponent;
  let fixture: ComponentFixture<JobCardComponent>;

  let mockJob: Job & Favorite;
  let jobServiceSpy: jasmine.SpyObj<JobService>;

  beforeEach(async () => {
    mockJob = { ...ALL_JOBS[0], isFavorite: false };
    jobServiceSpy = jasmine.createSpyObj<JobService>('JobService', [
      'addFavorite',
      'removeFavorite',
    ]);

    await TestBed.configureTestingModule({
      imports: [JobCardComponent],
      providers: [
        { provide: JobService, useValue: jobServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JobCardComponent);
    component = fixture.componentInstance;

    setComponentInput(fixture, 'job', mockJob);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('favorite button clicked', () => {
    let favoriteButton: HTMLButtonElement;

    beforeEach(() => {
      favoriteButton = fixture.nativeElement.querySelector(
        'button.favorite-button',
      );
    });

    it('should add the job as favorite when the job is NOT a favorite', () => {
      // not a favorite by default

      favoriteButton.click();

      expect(jobServiceSpy.removeFavorite).not.toHaveBeenCalled();
      expect(jobServiceSpy.addFavorite).toHaveBeenCalledOnceWith(mockJob.id);
    });

    it('should remove the job as favorite when the job is already favorite', () => {
      const favoriteJob = { ...ALL_JOBS[0], isFavorite: true };
      setComponentInput(fixture, 'job', favoriteJob);
      fixture.detectChanges();

      favoriteButton.click();

      expect(jobServiceSpy.addFavorite).not.toHaveBeenCalled();
      expect(jobServiceSpy.removeFavorite).toHaveBeenCalledOnceWith(mockJob.id);
    });
  });
});
