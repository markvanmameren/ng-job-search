import { inject, Injectable } from '@angular/core';
import { JobApiService } from '../job-api/job-api.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private jobApiService = inject(JobApiService);
  private localStorageService = inject(LocalStorageService);
}
