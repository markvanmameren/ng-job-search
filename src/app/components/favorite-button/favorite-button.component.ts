import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [],
  templateUrl: './favorite-button.component.html',
  styleUrl: './favorite-button.component.css',
})
export class FavoriteButtonComponent {
  isFavorite = input.required<boolean>();

  buttonClick = output<boolean>();
}
