import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { key, separator } from './local-storage.constants';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private favoriteIdsSubjects$ = new BehaviorSubject<number[]>([]);
  public favoriteIds$ = this.favoriteIdsSubjects$.asObservable();

  constructor() {
    this.favoriteIdsSubjects$.next(this.read());
  }

  private currentFavorites = (): number[] =>
    this.favoriteIdsSubjects$.getValue();

  public saveFavoriteId(newFavoriteId: number): void {
    if (this.isStoredFavoriteId(newFavoriteId)) return;

    const favorites: number[] = [...this.currentFavorites(), newFavoriteId];

    this.write(favorites);
  }

  public removeFavoriteId(favoriteIdToRemove: number): void {
    if (!this.isStoredFavoriteId(favoriteIdToRemove)) return;

    const favorites = this.currentFavorites().filter(
      (id) => id !== favoriteIdToRemove
    );

    this.write(favorites);
  }

  public isStoredFavoriteId = (favoriteId: number): boolean =>
    this.currentFavorites().includes(favoriteId);

  private read(): number[] {
    const serialized = window.localStorage.getItem(key);
    if (serialized === null) return [];
    return serialized.split(separator).map((idAsString) => +idAsString);
  }

  private write(favoriteIds: number[]): void {
    this.favoriteIdsSubjects$.next(favoriteIds);
    const serialized = favoriteIds
      .map((idAsNumber) => idAsNumber.toString())
      .join();
    window.localStorage.setItem(key, serialized);
  }
}
