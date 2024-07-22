import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { ALL_JOBS } from '../../../mocks';
import { Favorite, Job } from '../../interfaces/job.interface';
import { JobService } from '../../services/job/job.service';
import { setComponentInput } from '../../testing/utilities/set-component-input.util';
import { JobCardsComponent } from './job-cards.component';

describe('JobCardsComponent', () => {
  let component: JobCardsComponent;
  let fixture: ComponentFixture<JobCardsComponent>;

  let mockJobs: Array<Job & Favorite>;

  beforeEach(async () => {
    mockJobs = ALL_JOBS.map((job) => ({ ...job, isFavorite: false }));

    await TestBed.configureTestingModule({
      imports: [JobCardsComponent],
      providers: [
        { provide: JobService, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JobCardsComponent);
    component = fixture.componentInstance;

    setComponentInput(fixture, 'jobs', mockJobs);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
