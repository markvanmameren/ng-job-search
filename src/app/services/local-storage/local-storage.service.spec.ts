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
    getSpy = spyOn(window.localStorage, 'getItem').and.returnValue(
      serializedMockIds,
    );
    setSpy = spyOn(window.localStorage, 'setItem');

    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('readFavoriteJobIds', () => {
    it('should read from localStorage ', () => {
      const result = service.readFavoriteJobIds();

      expect(setSpy).not.toHaveBeenCalled();
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockIds);
    });
  });

  describe('writeFavoriteJobIds', () => {
    it('should write to localStorage', () => {
      service.writeFavoriteJobIds(mockIds);

      expect(setSpy).toHaveBeenCalledOnceWith(
        localStorageKey,
        serializedMockIds,
      );
      expect(getSpy).not.toHaveBeenCalled();
    });
  });
});
