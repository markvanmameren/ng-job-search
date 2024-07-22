import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { of, Subject } from 'rxjs';
import { DETAILED } from '../../../mocks';
import { JobDetails } from '../../interfaces/job.interface';
import { JobApiService } from '../../services/job-api/job-api.service';
import { JobDetailComponent } from './job-detail.component';

describe('JobDetailComponent', () => {
  let component: JobDetailComponent;
  let fixture: ComponentFixture<JobDetailComponent>;

  let mockJob: JobDetails;
  let mockId: number;
  let paramMapSubject: Subject<ParamMap>;

  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let locationSpy: jasmine.SpyObj<Location>;
  let jobApiServiceSpy: jasmine.SpyObj<JobApiService>;

  beforeEach(async () => {
    mockId = +Object.keys(DETAILED)[0];
    mockJob = DETAILED[mockId];
    paramMapSubject = new Subject<ParamMap>();

    activatedRouteSpy = jasmine.createSpyObj<ActivatedRoute>(
      'ActivatedRoute',
      {},
      { paramMap: paramMapSubject.asObservable() },
    );
    locationSpy = jasmine.createSpyObj(Location, ['back']);
    jobApiServiceSpy = jasmine.createSpyObj(JobApiService, {
      getJobDetails$: of(mockJob),
    });

    await TestBed.configureTestingModule({
      imports: [JobDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: Location, useValue: locationSpy },
        { provide: JobApiService, useValue: jobApiServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JobDetailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('article element', () => {
    let article: HTMLElement | null;

    const render = () => {
      fixture.detectChanges();
      article = fixture.nativeElement.querySelector('article.job');
    };

    it('should NOT render an article element when no job-id is provided', () => {
      const emptyParamMap = convertToParamMap({});

      paramMapSubject.next(emptyParamMap);
      render();

      expect(article).toBeNull();
    });

    it('should render an article element when a job-id is provided', () => {
      const paramMapWithId = convertToParamMap({ id: mockId.toString() });

      paramMapSubject.next(paramMapWithId);
      render();

      expect(article).toBeInstanceOf(HTMLElement);
    });
  });

  describe('back button', () => {
    it('should navigate back on click', () => {
      const backButton = fixture.nativeElement.querySelector('button.back');

      backButton.click();

      expect(locationSpy.back).toHaveBeenCalledTimes(1);
    });
  });
});
