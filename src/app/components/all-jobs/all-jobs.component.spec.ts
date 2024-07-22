import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ALL_JOBS } from '../../../mocks';
import { Favorite, Job } from '../../interfaces/job.interface';
import { JobService } from '../../services/job/job.service';
import { AllJobsComponent } from './all-jobs.component';

fdescribe('AllJobsComponent', () => {
  let component: AllJobsComponent;
  let fixture: ComponentFixture<AllJobsComponent>;

  let mockJobs: WritableSignal<Array<Job & Favorite>>;
  let jobServiceSpy: jasmine.SpyObj<JobService>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    mockJobs = signal(ALL_JOBS.map((job) => ({ ...job, isFavorite: false })));
    jobServiceSpy = jasmine.createSpyObj<JobService>(
      'JobService',
      {},
      { jobs: mockJobs },
    );

    activatedRouteSpy = jasmine.createSpyObj<ActivatedRoute>(
      'ActivatedRoute',
      [],
      ['paramMap'],
    );

    await TestBed.configureTestingModule({
      imports: [AllJobsComponent],
      providers: [
        { provide: JobService, useValue: jobServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AllJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a job cards component', () => {
    const jobCards = fixture.nativeElement.querySelector('app-job-cards');

    expect(jobCards).toBeInstanceOf(HTMLElement);
  });
});
