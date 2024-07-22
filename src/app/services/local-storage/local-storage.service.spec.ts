import { TestBed } from '@angular/core/testing';

import {
  localStorageKey,
  localStorageSeparator,
} from './local-storage.constants';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  const mockIds = [44444, 33333, 22222];
  const serializedMockIds = mockIds.join(localStorageSeparator);

  let getSpy: jasmine.Spy;
  let setSpy: jasmine.Spy;

  beforeEach(() => {
    getSpy = spyOn(window.localStorage, 'getItem');
    setSpy = spyOn(window.localStorage, 'setItem');

    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('readFavoriteJobIds', () => {
    it('should read from localStorage ', () => {
      getSpy.and.returnValue(serializedMockIds);

      const result = service.readFavoriteJobIds();

      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockIds);
    });

    it('should return an empty array if the key does not have any matches', () => {
      getSpy.and.returnValue(null);

      const result = service.readFavoriteJobIds();

      expect(result).toEqual([]);
    });
  });

  describe('writeFavoriteJobIds', () => {
    it('should write to localStorage', () => {
      service.writeFavoriteJobIds(mockIds);

      expect(setSpy).toHaveBeenCalledOnceWith(
        localStorageKey,
        serializedMockIds,
      );
    });
  });
});
