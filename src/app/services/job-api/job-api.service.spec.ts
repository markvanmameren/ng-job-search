import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
  TestRequest,
} from '@angular/common/http/testing';
import { SubscriberSpy, subscribeSpyTo } from '@hirez_io/observer-spy';
import { ALL_JOBS, DETAILED } from '../../../mocks';
import { Job, JobDetails } from '../../interfaces/job.interface';
import { jobsUrl } from '../job/job.constants';
import { JobApiService } from './job-api.service';

describe('JobApiService', () => {
  let service: JobApiService;
  let httpTestingController: HttpTestingController;

  const mockJobs = ALL_JOBS;
  const mockJobId = +Object.keys(DETAILED)[3];
  const mockJobDetails = DETAILED[mockJobId];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(JobApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('API calls', () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    describe('getAllJobs$', () => {
      const expectedUrl = jobsUrl;

      let observerSpy: SubscriberSpy<Job[]>;
      let testRequest: TestRequest;

      beforeEach(() => {
        observerSpy = subscribeSpyTo(service.getAllJobs$());
        testRequest = httpTestingController.expectOne(expectedUrl);
      });

      it('should execute a GET request with the correct URL', () => {
        expect(testRequest.request.method).toBe('GET');
      });

      it('should return an observable of jobs', () => {
        testRequest.flush(mockJobs);
        expect(observerSpy.getLastValue()).toEqual(mockJobs);
      });
    });

    describe('getJobDetails$', () => {
      const expectedUrl = `${jobsUrl}/${mockJobId}`;

      let observerSpy: SubscriberSpy<JobDetails>;
      let testRequest: TestRequest;

      beforeEach(() => {
        observerSpy = subscribeSpyTo(service.getJobDetails$(mockJobId));
        testRequest = httpTestingController.expectOne(expectedUrl);
      });

      it('should execute a GET request with the correct URL', () => {
        expect(testRequest.request.method).toBe('GET');
      });

      it('should return an observable of a detailed job', () => {
        testRequest.flush(mockJobDetails);
        expect(observerSpy.getLastValue()).toEqual(mockJobDetails);
      });
    });
  });
});
