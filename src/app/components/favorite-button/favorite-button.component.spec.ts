import { ComponentFixture, TestBed } from '@angular/core/testing';

import { setComponentInput } from '../../testing/utilities/set-component-input.util';
import { FavoriteButtonComponent } from './favorite-button.component';

describe('FavoriteButtonComponent', () => {
  let component: FavoriteButtonComponent;
  let fixture: ComponentFixture<FavoriteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteButtonComponent);
    component = fixture.componentInstance;

    setComponentInput(fixture, 'isFavorite', false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('favorite button clicked', () => {
    let emitSpy: jasmine.Spy;
    let button: HTMLButtonElement;

    beforeEach(() => {
      emitSpy = spyOn(component.favoriteButtonClicked, 'emit');
      button = fixture.nativeElement.querySelector('button.favorite-button');
    });

    it('should emit true on the favoriteButtonClicked output when the button is clicked and isFavorite is false', () => {
      // isFavorite is false on init

      button.click();

      expect(emitSpy).toHaveBeenCalledOnceWith(true);
    });

    it('should emit false on the favoriteButtonClicked output when the button is clicked and isFavorite is true', () => {
      setComponentInput(fixture, 'isFavorite', true);

      button.click();

      expect(emitSpy).toHaveBeenCalledOnceWith(false);
    });
  });
});
