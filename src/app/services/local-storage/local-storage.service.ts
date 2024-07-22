import { Injectable } from '@angular/core';
import {
  localStorageKey,
  localStorageSeparator,
} from './local-storage.constants';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  readFavoriteJobIds(): number[] {
    const serialized = window.localStorage.getItem(localStorageKey);
    if (serialized === null) return [];

    return serialized
      .split(localStorageSeparator)
      .map((idAsString) => +idAsString);
  }

  writeFavoriteJobIds(favoriteIds: number[]): void {
    const serialized = favoriteIds
      .map((id) => id.toString())
      .join(localStorageSeparator);

    window.localStorage.setItem(localStorageKey, serialized);
  }
}
